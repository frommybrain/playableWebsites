import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch additional user details from the database
    const result = await sql`SELECT * FROM PW_Users WHERE id = ${userId};`;
    const user = result.rows[0];
    console.log('Fetched user from DB:', user);

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
