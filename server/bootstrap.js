import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Rooms, Messages } from '../lib/collections';

Meteor.startup(function() {
  if (Rooms.find().count() !== 0) return;

  Messages.remove({});

  const messages = [
    {
      text: 'You on your way?',
      timestamp: Moment().subtract(1, 'hours').toDate()
    },
    {
      text: 'Hey, it\'s me',
      timestamp: Moment().subtract(2, 'hours').toDate()
    },
    {
      text: 'I should buy a boat',
      timestamp: Moment().subtract(1, 'days').toDate()
    },
    {
      text: 'Look at my mukluks!',
      timestamp: Moment().subtract(4, 'days').toDate()
    },
    {
      text: 'This is wicked good ice cream.',
      timestamp: Moment().subtract(2, 'weeks').toDate()
    }
  ];

  messages.forEach((m) => {
    Messages.insert(m);
  });

  const rooms = [
    {
      name: 'Coding',
      picture: 'https://freeiconshop.com/files/edd/code-flat.png'
    },
    {
      name: 'Travel',
      picture: 'http://www.freeiconspng.com/uploads/suitcase-travel-flat-design-travel-icon-png-suitcase-png-suitcase-icon--22.png'
    },
    {
      name: 'PhotoGraphy',
      picture: 'https://freeiconshop.com/files/edd/camera-flat.png'
    },
    {
      name: 'Dota2',
      picture: 'https://s-media-cache-ak0.pinimg.com/originals/ac/ab/be/acabbe92695680d3bb3317d8708ec1a2.jpg'
    }
  ];

  rooms.forEach((r) => {
    const message = Messages.findOne({ roomId: { $exists: false } });
    r.lastMessage = message;
    const roomId = Rooms.insert(r);
    Messages.update(message._id, { $set: { roomId } });
  });
});
