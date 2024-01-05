import passport from '../../../../lib/passport'

export default function handler(req, res) {
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-follow-read'], 
  })(req, res);
}
