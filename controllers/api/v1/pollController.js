const Poll = require('../../../modals/poll');

const User = require('../../../modals/User');

const { OAuth2Client } = require('google-auth-library');

module.exports.createPoll = async function (req, res) {
  try {
    let userid = req.params.id;
    if (userid == req.user._id) {
      let pollName = req.body.poll_name;
      let startTime = req.body.start_time;
      let endTime = req.body.end_time;
      let option1 = req.body.option_1;
      let option2 = req.body.option_2;
      let option3 = req.body.option_3;
      let option4 = req.body.option_4;

      let input = {
        pollName,
        startTime,
        endTime,
        option1,
        option2,
        option3,
        option4,
      };
      let poll = await Poll.create(input);
      if (poll) {
        let user = await User.findById(req.user._id);
        if (user) {
          user.poll.push(poll);
          user.save();
          return res.status(200).json({ message: 'Poll Successfully Created' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      return res
        .status(500)
        .json({ message: 'Poll not created, Please try again later' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
