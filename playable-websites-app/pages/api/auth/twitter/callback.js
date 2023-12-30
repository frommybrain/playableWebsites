import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    // Create a new Twitter client
    const twitterClient = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    // Exchange the code for tokens
    const { accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
      code,
      redirectUri: process.env.TWITTER_CALLBACK_URL,
      codeVerifier: state, // or retrieve the codeVerifier from a session or cookie if you stored it earlier
    });

    // Use the access token to fetch user details or create a session
    // ...

    // Redirect the user to a success page, or handle the logged-in user's data
    res.redirect('/success'); // or another relevant page
  } catch (error) {
    console.error('Twitter OAuth Callback Error:', error);
    res.status(500).json({ message: 'Error processing Twitter OAuth callback.' });
  }
}
