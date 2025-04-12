import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '../../src/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, fullName } = req.body;

    const client = await clientPromise;
    const db = client.db('launchmate');

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      fullName,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create JWT
    const token = jwt.sign(
      { userId: result.insertedId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Strict`);

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: result.insertedId,
        email,
        fullName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}