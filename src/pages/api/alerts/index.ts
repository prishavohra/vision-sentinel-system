// src/pages/api/alerts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  try {
    const client = await MongoClient.connect(uri, { connectTimeoutMS: 5000 });
    const db = client.db(dbName);
    const alerts = await db.collection('alerts').find({}).sort({ timestamp: -1 }).toArray();
    client.close();
    res.status(200).json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
}
