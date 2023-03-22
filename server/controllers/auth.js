const passport = require('passport');
const validator = require('validator');
const User = require('../models/user');

exports.postSignup = (req, res, next) => {
  const validationErrors = [];

  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address'});
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long'});
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match'});

  if (validationErrors.length) {
    console.log('Error with one or more of the inputs');
    return res.send(validationErrors.join('.'));
  };

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({
    $or: [
      { email: req.body.email },
      { userName: req.body.userName }
    ]
  }, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      console.log('Account with that email address or username already exists');
      return res.send('Account with that email address or username already exists');
    };
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        };
        console.log('New user created');
        res.send('New user created');
      });
    });
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];

  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  };

  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: 'Password cannot be blank.' });
  };

  if (validationErrors.length) {
    console.log('Either the password or email is wrong!');
    return res.send('Either the password or email is wrong!');
  };

  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('Error');
      return res.send('Error');
    };

    req.logIn(user, (err) => {
      if (err) { return next(err) }
      console.log('Success! You are logged in.');
      res.send('Success! You are logged in.');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}