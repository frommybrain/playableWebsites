import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, pointsToAdd } = req.body;

    try {
      const result = await sql`
        UPDATE PW_Users SET score = score + ${pointsToAdd}
        WHERE id = ${userId}
        RETURNING score;
      `;
      res.status(200).json({ newScore: result.rows[0].score });
    } catch (error) {
      res.status(500).json({ message: 'Error updating score' });
    }
  } else {
    res.status(405).end();
  }
}
