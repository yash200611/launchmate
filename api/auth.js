import clientPromise from './connect.mjs';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const client = await clientPromise;
    const db = client.db('launchmate');
    const users = db.collection('users');

    const { type, email, password } = req.body;

    if (!email || !password || !type) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    if (type === 'signup') {
      const existing = await users.findOne({ email });
      if (existing) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const result = await users.insertOne({ email, password: hashed });
      return res.status(201).json({ email, userId: result.insertedId });
    }

    if (type === 'signin') {
      const user = await users.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Incorrect password' });

      return res.status(200).json({ email, userId: user._id });
    }

    return res.status(400).json({ error: 'Invalid auth type' });
  } catch (err) {
    console.error('AUTH HANDLER ERROR:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
