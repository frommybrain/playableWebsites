import passport from '../../../../lib/passport'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default function handler(req, res) {
  passport.authenticate('google', (err, user, info) => {
    if (err || !user) {
      return res.redirect('/?service=google&status=error');
    }

    // Generate JWT token with 24-hour expiration
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Set the JWT token as an HTTP-only cookie using Next.js cookies function
    cookies(res).set('token', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",

      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    return res.redirect('/?service=google&status=success');
  })(req, res);
}
