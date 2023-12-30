import { getTwitterAuthLink } from '../../../lib/auth/twitterOAuth';

export default async function handler(req, res) {
  try {
    const { url } = await getTwitterAuthLink();
    res.redirect(url);
  } catch (error) {
    console.error('Twitter OAuth error:', error);
    res.status(500).json({ message: 'Error initiating Twitter OAuth.' });
  }
}
