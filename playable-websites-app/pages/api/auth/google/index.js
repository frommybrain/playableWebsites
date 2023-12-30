import passport from '../../../../lib/passport'
export default function handler(req, res) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, () => {
    // Handle the request after Passport authentication
  });
}
