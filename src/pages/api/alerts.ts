import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Your MongoDB URI
const dbName = "FaceRecognition"; 
const collectionName = "Alerts"; 

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const alerts = await collection.find({}).sort({ timestamp: -1 }).toArray();

    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
}
