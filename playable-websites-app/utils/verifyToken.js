// utils/verifyTokenFunction.js
async function verifyToken() {

    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        console.log('Data returned from verify endpoint:', data);

        return data.user; // Assuming the server sends back the user data
      }
      return null; // Token is not valid or user is not logged in
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
  
  export default verifyToken;
  