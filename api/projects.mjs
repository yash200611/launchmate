// FILE: api/projects.js
import clientPromise from './connect.mjs';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('launchmate');
  const collection = db.collection('projects');

  if (req.method === 'GET') {
    const { ownerEmail } = req.query;
    if (!ownerEmail) return res.status(400).json({ error: 'Missing ownerEmail in query' });

    const projects = await collection.find({ ownerEmail }).toArray();
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    const {
      title,
      description,
      visibility,
      problem,
      targetAudience,
      stage,
      tags,
      ownerEmail
    } = req.body;

    if (!title || !description || !ownerEmail) {
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
      ownerEmail,
      lastEdited: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      collaborators: [],
      favorite: false,
    };

    const result = await collection.insertOne(newProject);
    return res.status(201).json({ insertedId: result.insertedId, ...newProject });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
