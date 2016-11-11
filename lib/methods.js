import { Meteor } from 'meteor/meteor';
import { Rooms, Messages } from '../lib/collections';
import { check } from 'meteor/check';

Meteor.methods({
  newMessage(message) {
   if (!this.userId) {
     throw new Meteor.Error('not-logged-in',
     'Must be logged in to send message.');
    }
       check(message, Match.OneOf(
      {
        text: String,
        type: String,
        roomId: String
      },
      {
        picture: String,
        type: String,
        roomId: String
      }

    ));

    message.timestamp = new Date();
    message.userId = this.userId;
    message.userName = Meteor.user().username;
    //check for userId, for authenticate
    console.log(message.userName);

    const messageId = Messages.insert(message);
    Rooms.update(message.roomId, { $set: { lastMessage: message } });

    return messageId;
    },
    //create method updateName for profile tab
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }
    //on success, all above for erros
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name }
    });
 },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }
    check(data, String);

    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});
