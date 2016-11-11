import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { SubRooms, Messages } from '../../../lib/collections';

export default class SubRoomCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subRoomId = this.$stateParams.subRoomId;
    this.userId = Meteor.userId();
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    this.helpers({
      messages() {
        return Messages.find({ subRoomId: this.subRoomId });
      },
      data() {
        return SubRooms.findOne(this.subRoomId);
      }
    });
  }

  sendPicture() {
    MeteorCameraUI.getPicture({}, (err, data) => {
      if (err) return this.handleError(err);
      this.callMethod('newMessage', {
        picture: data,
        type: 'picture',
        subRoomId: this.subRoomId
      });
    });
  }
    handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profile save error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
  sendMessage() {
    if (_.isEmpty(this.message)) return;

    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      subRoomId: this.subRoomId
    });

    delete this.message;
  }

  inputUp () {
   if (this.isIOS) {
     this.keyboardHeight = 216;
   }

   this.scrollBottom(true);
  }

  inputDown () {
   if (this.isIOS) {
     this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    }, 300);
  }
}

SubRoomCtrl.$name = 'SubRoomCtrl';
SubRoomCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];
