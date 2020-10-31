const User = require('../../../modals/User');

const Event = require('../../../modals/event');

module.exports.newEvent = async function (req, res) {
  try {
    let user = req.user._id;
    if (user == req.params.userid) {
      let findUser = await User.findById(user);
      if (findUser) {
        let startTime = req.body.start_time;
        let endTime = req.body.end_time;
        let eventName = req.body.event_name;
        let eventDate = req.body.date;
        let discription = req.body.discription;
        let input = {
          user,
          startTime,
          endTime,
          eventName,
          eventDate,
          discription,
        };
        let event = await Event.create(input);
        if (event) {
          findUser.event.push(event);
          findUser.save();
          return res.status(200).json({
            message: 'Event Successfully Created',
          });
        }
        return res.status(500).json({
          message: 'Event not created',
        });
      }
      return res.status(500).json({ message: 'No user found' });
    }
    return res
      .status(401)
      .json({ message: 'Sorry you are not authorized to add events' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
