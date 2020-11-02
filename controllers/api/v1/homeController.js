const User = require('../../../modals/User');
const Event = require('../../../modals/event');

module.exports.home = async function (req, res) {
  try {
    let user = await User.find({}).select('-password');
    let event = await Event.find({});
    return res.status(200).json({
      message: 'List of Clubs and Events',
      data: {
        user,
        event,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
