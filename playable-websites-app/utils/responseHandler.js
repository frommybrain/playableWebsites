// utils/responseHandler.js
import { toast } from 'react-toastify';

const responseMap = {
  'google-success': () => toast.success('Google login successful!'),
  'google-error': () => toast.error('Google Authentication failed.'),
  'twitter-connected': () => toast.info('Twitter connected successfully.'),
  'spotify-connected': () => toast.info('Spotify connected successfully.'),
  // ... other response mappings
};

export const handleQueryResponse = (service, status) => {
  const responseKey = `${service}-${status}`;
  if (responseMap[responseKey]) {
    responseMap[responseKey]();
  }
};
