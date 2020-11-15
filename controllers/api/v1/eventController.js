const User = require('../../../modals/User');

const Event = require('../../../modals/event');

module.exports.newEvent = async function (req, res) {
  try {
    Event.uploadedEImage(req, res, async function (err) {
      if (err) {
        console.log('Multer Error', err);
        res.status(500).json({ message: 'Error Uploading Image' });
      }
      let user = req.user._id;
      if (user == req.params.userid) {
        let findUser = await User.findById(user);
        if (findUser) {
          let startTime = req.body.start_time;
          let endTime = req.body.end_time;
          let eventName = req.body.event_name;
          let eventDate = req.body.date;
          let discription = req.body.discription;
          let shortDiscription = req.body.short_discription;
          let input = {
            user,
            startTime,
            endTime,
            eventName,
            eventDate,
            discription,
            shortDiscription,
          };
          let event = await Event.create(input);
          if (event) {
            findUser.event.push(event);
            findUser.save();
            if (req.file) {
              if (event.eimage) {
                if (fs.existsSync(path.join(__dirname, '..', 'event.eimage'))) {
                  fs.unlinkSync(path.join(__dirname, '..', 'event.eimage'));
                }
              }

              console.log(req.file);
              //this is saving the path of the uploaded file into the avatar field of the user
              event.eimage = Event.EImagePath + '/' + req.file.filename;
            }
            event.save();
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
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
