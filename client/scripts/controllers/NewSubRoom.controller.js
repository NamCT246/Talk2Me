import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { SubRooms } from '../../../lib/collections';

export default class NewSubRoomCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      users() {
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
  }

  inviteUser(userId){
    var subroomName = document.getElementById("subroomName").value;
    var desc = document.getElementById("subroomDescription").value;
    console.log(this.currentUserId)
        SubRooms.insert({"name": subroomName, "creatorId": userId,
       "description":desc, "userIds": {$all :[this.currentUserId, userId]} }  );

      let subroom = SubRooms.findOne({ userIds: { $all: [this.currentUserId, userId] } });
      if (subroom) {
        this.hideNewChatModal();
        return this.goToChat(subroom._id);
      }

      this.callMethod('inviteUser', userId, (err, subRoomId) => {
        this.hideNewChatModal();
        if (err) return this.handleError(err);
        this.goToChat(subRoomId);
    });

    Users.findOne({"_id": userId }).update({ $set: {"subroomId" : subroom._id  } });
  }

  // newChat(userId) {
  //   console.log(userId);
  //   let subroom = SubRooms.findOne({ userIds: { $all: [this.currentUserId, userId] } });
  //   if (subroom) {
  //     this.hideNewChatModal();
  //     return this.goToChat(subroom._id);
  //   }

  //   this.callMethod('newChat', userId, (err, chatId) => {
  //     this.hideNewChatModal();
  //     if (err) return this.handleError(err);
  //     this.goToChat(chatId);
  //   });
  // }
  hideNewChatModal() {
    this.NewSubRoom.hideModal();
  }

  goToChat(subRoomId) {
    this.$state.go('tab.subroom', { subRoomId });
  }
  handleError(err) {

    this.$log.error('New chat creation error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'New chat creation failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

NewSubRoomCtrl.$name = 'NewSubRoomCtrl';

NewSubRoomCtrl.$inject = ['$state', 'NewSubRoom', '$ionicPopup', '$log'];

