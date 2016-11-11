import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Rooms } from '../../../lib/collections';

export default class RoomsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      data() {
        return Rooms.find();
      }
    });
  }

  remove(room) {
    Rooms.remove(room._id);
  }
}

RoomsCtrl.$name = 'RoomsCtrl';
