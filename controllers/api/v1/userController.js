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
    let filterUser = await User.findOne({ email: req.body.email })
      .select('-password')
      .select('-__v');
    return res.status(200).json({
      message: 'Sign In successful',
      data: {
        token: jwt.sign(filterUser.toJSON(), 'something', {
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
    User.uploadedAvatar(req, res, async function (err) {
      if (err) {
        console.log('Multer Error', err);
        res.status(500).json({ message: 'Error Uploading Image' });
      }
      if (req.body.password != req.body.confirm_password) {
        return res
          .status(403)
          .json({ message: 'Password and Confirm Password does not match' });
      }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        let newUser = await User.create(req.body);
        if (newUser) {
          if (req.file) {
            if (newUser.avatar) {
              if (fs.existsSync(path.join(__dirname, '..', 'newUser.avatar'))) {
                fs.unlinkSync(path.join(__dirname, '..', 'newUser.avatar'));
              }
            }

            console.log(req.file);
            //this is saving the path of the uploaded file into the avatar field of the user
            newUser.avatar = User.AvatarPath + '/' + req.file.filename;
          }
          newUser.save();
          let filterUser = await User.findOne({ email: req.body.email })
            .select('-password')
            .select('-__v');
          return res.status(200).json({
            message: 'Sign In successful',
            data: {
              token: jwt.sign(filterUser.toJSON(), 'something', {
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
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
