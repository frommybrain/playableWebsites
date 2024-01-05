import passport from '../../../../lib/passport';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export default function handler(req, res) {
    passport.authenticate('spotify', async (err, profile) => {
        if (err || !profile) {
            return res.redirect('/?service=spotify&status=error');
        }

        const accessToken = profile.accessToken;
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);

        try {
            // Verify and extract user ID from JWT token
            const token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            const artistId = '6MDME20pz9RveH9rEXvrOM';
            const response = await spotifyApi.isFollowingArtists([artistId]);
            const isFollowing = response.body[0];

            // Check if there's an existing Spotify connection entry
            const existingEntry = await sql`
                SELECT * FROM pw_user_actions WHERE user_id = ${userId} AND action_type = 'spotifyConnection';
            `;

            if (existingEntry.rowCount > 0) {
                // Update existing entry
                await sql`
                    UPDATE pw_user_actions
                    SET action_value = ${isFollowing ? 'connectedFollowing' : 'connectedNotFollowing'},
                        action_date = CURRENT_TIMESTAMP,
                        access_token = ${accessToken}
                    WHERE user_id = ${userId} AND action_type = 'spotifyConnection';
                `;
            } else {
                // Create a new entry
                await sql`
                    INSERT INTO pw_user_actions (user_id, action_type, action_value, action_date, access_token)
                    VALUES (${userId}, 'spotifyConnection', ${isFollowing ? 'connectedFollowing' : 'connectedNotFollowing'}, CURRENT_TIMESTAMP, ${accessToken});
                `;
            }

            return res.redirect(isFollowing ? '/?service=spotify&status=success-following' : '/?service=spotify&status=success-not-following');
        } catch (error) {
            console.error('Error checking Spotify artist following:', error);
            return res.redirect('/?service=spotify&status=error');
        }
    })(req, res);
}
