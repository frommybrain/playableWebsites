import { TwitterApi } from 'twitter-api-v2';

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_CLIENT_ID,
  appSecret: process.env.TWITTER_CLIENT_SECRET,
});

export const getTwitterAuthLink = async () => {
  const { url, oauth_token, oauth_token_secret } = await twitterClient.generateAuthLink(process.env.TWITTER_CALLBACK_URL);
  return { url, oauth_token, oauth_token_secret };
};
