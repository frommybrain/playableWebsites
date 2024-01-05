import passport from 'passport';
import { sql } from '@vercel/postgres';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as SpotifyStrategy } from 'passport-spotify';

{/* Google */}
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
  throw new Error("Google OAuth environment variables are not properly set.");
}

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const email = profile.emails[0].value;

    // Check if user exists and update their information including last_login
    const existingUserResult = await sql`
      UPDATE PW_Users SET 
        first_name = ${firstName}, 
        last_name = ${lastName}, 
        email = ${email},
        last_login = CURRENT_TIMESTAMP
      WHERE google_id = ${googleId}
      RETURNING *;
    `;

    if (existingUserResult.rowCount > 0) {
      // User exists and is updated
      return done(null, existingUserResult.rows[0]);
    } else {
      // New user, add to the database
      const newUser = await sql`
INSERT INTO PW_Users (google_id, first_name, last_name, email, last_login) 
VALUES (${googleId}, ${firstName}, ${lastName}, ${email}, CURRENT_TIMESTAMP) 
RETURNING *;
`;
      return done(null, newUser.rows[0]);

    }
  } catch (error) {
    return done(error);
  }
}));

{/* Spotify */}

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/spotify/callback'
},
function(accessToken, refreshToken, expires_in, profile, done) {
  // Attach accessToken to the user profile
  profile.accessToken = accessToken;

  return done(null, profile);
}));




export default passport;