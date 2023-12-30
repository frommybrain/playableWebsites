// /pages/api/db/users/update-user.js

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        const { googleId, firstName, lastName, email } = req.body;
  
        // Update user data in the database
        const result = await sql`
          UPDATE PW_Users SET 
            first_name = ${firstName}, 
            last_name = ${lastName}, 
            email = ${email}
          WHERE google_id = ${googleId}
          RETURNING *;
        `;
        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  