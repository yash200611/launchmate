import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  ssl: true,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

// Initialize MongoDB client
client = new MongoClient(uri, options);
clientPromise = client.connect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerEmail = searchParams.get('ownerEmail');

    if (!ownerEmail) {
      return NextResponse.json({ error: 'Missing ownerEmail in query' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('launchmate');
    const collection = db.collection('projects');

    const projects = await collection.find({ ownerEmail }).toArray();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      visibility,
      problem,
      targetAudience,
      stage,
      tags,
      ownerEmail
    } = body;

    if (!title || !description || !ownerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('launchmate');
    const collection = db.collection('projects');

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
    return NextResponse.json({ insertedId: result.insertedId, ...newProject }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 