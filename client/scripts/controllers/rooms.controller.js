import { Controller } from 'angular-ecmascript/module-helpers';
import { globalRooms } from '../../../lib/collections';

export default class GlobalRoomsCtrl extends Controller {
constructor() {
    super(...arguments);
   
    this.helpers({
      data() {
        return globalRooms.findOne();
        //just for fun
      }
    });
  }
}

GlobalRoomsCtrl.$name = 'GlobalRoomsCtrl';

