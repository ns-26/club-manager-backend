const User = require('../../../modals/User');

const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: 'Invalid Username or password',
      });
    }
    return res.status(200).json({
      message: 'Sign In successful token generated not to be shared',
      data: {
        token: jwt.sign(user.toJSON(), 'something', {
          expiresIn: '1000000',
        }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res
        .status(403)
        .json({ message: 'Password and Confirm Password does not match' });
    }
    let user = await User.findOne({ email: req.body.username });
    if (!user) {
      let newUser = await User.create(req.body);
      if (newUser) {
        return res.status(200).json({
          message: 'Sign In successful token generated not to be shared',
          data: {
            token: jwt.sign(newUser.toJSON(), 'something', {
              expiresIn: '1000000',
            }),
          },
        });
      } else {
        return res.status(500).json({
          message: 'User not registered',
        });
      }
    } else {
      return res.status(403).json({ message: 'Username Exists' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
