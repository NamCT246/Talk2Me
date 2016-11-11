import { Controller } from 'angular-ecmascript/module-helpers';
import { SubRooms } from '../../../lib/collections';

export default class SubRoomsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      data() {
        return SubRooms.find();
      }
    });
  }

  remove(room) {
    SubRooms.remove(room._id);
  }
  
  createNewSubRoom() {
    this.NewSubRoom.showModal();

  }

 
}

SubRoomsCtrl.$name = 'SubRoomsCtrl';
SubRoomsCtrl.$inject = ['NewSubRoom'];