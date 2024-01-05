// pages/api/auth/logout.js
export default function handler(req, res) {
    // Clear the cookie
    res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.status(200).json({ message: 'Logged out successfully' });
  }
  