import passport from '../../../../lib/passport';

export default function handler(req, res) {
  
  passport.authenticate('google', (err, user, info) => {
    if (err || !user) {
      // Redirect to the homepage with an error query parameter
      console.error(err || 'No user');
      return res.redirect('/?service=google&status=error');
    }
    // Successful authentication: Redirect to the homepage with a success parameter
    res.redirect('/?service=google&status=success');
  })(req, res, () => {
    console.log('Handled authentication callback');
  });
}
