import passport from '../../../../lib/passport';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  passport.authenticate('google', (err, user, info) => {
    if (err || !user) {
      return res.redirect('/?service=google&status=error');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Manually set the cookie
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    };
    res.setHeader('Set-Cookie', `token=${token}; Path=${cookieOptions.path}; HttpOnly; Max-Age=${cookieOptions.maxAge}; SameSite=${cookieOptions.sameSite}${cookieOptions.secure ? '; Secure' : ''}`);

    return res.redirect('/?service=google&status=success');
  })(req, res);
}
