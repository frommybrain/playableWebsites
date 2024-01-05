import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    try {
        const result = await sql`SELECT action_value FROM pw_user_actions WHERE user_id = ${userId} AND action_type = 'spotifyConnection' LIMIT 1;`;

        if (result.rowCount > 0) {
            const isConnected = result.rows[0].action_value.startsWith('connected');
            return res.status(200).json({ isConnected });
        } else {
            return res.status(200).json({ isConnected: false });
        }
    } catch (error) {
        console.error('Error during Spotify connection check:', error);
        return res.status(500).json({ error: 'Error checking Spotify connection' });
    }
}
