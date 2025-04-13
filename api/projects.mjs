// FILE: api/projects.mjs
import clientPromise from './connect.mjs';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('launchmate');
  const projects = db.collection('projects');

  try {
    if (req.method === 'GET') {
      const email = req.query.email;
      if (!email) return res.status(400).json({ error: 'Missing email' });

      const result = await projects.find({ ownerEmail: email }).toArray();
      return res.status(200).json(result);
    }

    if (req.method === 'POST') {
      const { title, description, problem, targetAudience, tags, ownerEmail } = req.body;
      if (!title || !ownerEmail || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newProject = {
        title,
        description: description || '',
        problem: problem || '',
        targetAudience: targetAudience || '',
        tags: tags || [],
        ownerEmail,
        stage: 'idea',
        lastEdited: new Date().toISOString()
      };

      const result = await projects.insertOne(newProject);
      return res.status(201).json({ ...newProject, id: result.insertedId });
    }

    if (req.method === 'PATCH') {
      const { id, visibility, collaborators } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing project ID' });
    
      const update = {};
      if (visibility) update.visibility = visibility;
      if (collaborators) update.collaborators = collaborators;
    
      const result = await projects.updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
      );
    
      return res.status(200).json({ success: true });
    }
    

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('PROJECT API ERROR:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
