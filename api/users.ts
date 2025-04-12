import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './connect';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db('launchmate');
  const collection = db.collection('users');

  if (req.method === 'POST') {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Missing name or email' });
    }

    // Check if user already exists
    const existing = await collection.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'User already exists' });
    }

    await collection.insertOne({ email, name, createdAt: new Date().toISOString() });
    res.status(201).json({ message: 'User created' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
