import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await sql`
        CREATE TABLE PW_Users (
          id SERIAL PRIMARY KEY,
          google_id VARCHAR(255) UNIQUE NOT NULL,
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          email VARCHAR(255) UNIQUE NOT NULL,
          signup_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
