import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from './connect';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db('launchmate');
  const collection = db.collection('projects');

  if (req.method === 'GET') {
    const projects = await collection.find({}).toArray();
    res.status(200).json(projects);
  } else if (req.method === 'POST') {
    const { title, description, visibility, problem, targetAudience, stage, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProject = {
      title,
      description,
      visibility,
      problem,
      targetAudience,
      stage,
      tags,
      lastEdited: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      collaborators: [],
      favorite: false,
    };

    const result = await collection.insertOne(newProject);
    res.status(201).json({ insertedId: result.insertedId, ...newProject });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
