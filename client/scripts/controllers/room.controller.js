import { Controller } from 'angular-ecmascript/module-helpers';
import { globalRooms } from '../../../lib/collections';

export default class GlobalRoomCtrl extends Controller {

  constructor() {

    super(...arguments);

    this.roomId = this.$stateParams.roomId; 

    this.helpers({
      data() {
        return globalRooms.findOne(this.roomId);
      }
    });
  }

}

GlobalRoomCtrl.$name = 'GlobalRoomCtrl';
GlobalRoomCtrl.$inject = ['$stateParams'];

