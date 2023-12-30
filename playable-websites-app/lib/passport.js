import passport from 'passport';
import { sql } from '@vercel/postgres';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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

    // Check if user exists
    const existingUserResult = await sql`
      SELECT * FROM PW_Users WHERE google_id = ${googleId};
    `;

    if (existingUserResult.rowCount > 0) {
      // User exists, update their information
      const updatedUser = await sql`
        UPDATE PW_Users SET 
          first_name = ${firstName}, 
          last_name = ${lastName}, 
          email = ${email}
        WHERE google_id = ${googleId}
        RETURNING *;
      `;
      return done(null, updatedUser.rows[0]);
    } else {
      // New user, add to the database
      const newUser = await sql`
        INSERT INTO PW_Users (google_id, first_name, last_name, email) 
        VALUES (${googleId}, ${firstName}, ${lastName}, ${email}) 
        RETURNING *;
      `;
      return done(null, newUser.rows[0]);
    }
  } catch (error) {
    return done(error);
  }
}));


export default passport;