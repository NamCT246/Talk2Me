// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-meteor-auth';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import RoomsCtrl from '../controllers/rooms.controller';
import RoomCtrl from '../controllers/room.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import SubRoomsCtrl from '../controllers/subrooms.controller';
import SubRoomCtrl from '../controllers/subroom.controller';
import NewSubRoomService from '../services/subroom.service';
import NewSubRoomCtrl from '../controllers/NewSubRoom.controller';
import LoginCtrl from '../controllers/login.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SignUpCtrl from '../controllers/signup.controller';
import SettingsCtrl from '../controllers/settings.controller';
import Routes from '../routes';

const App = 'Whatsapp';

// App
Angular.module(App, [
  'angular-meteor',
  'angular-meteor.auth',
  'angularMoment',
  'ionic'
]);

new Loader(App)
  .load(RoomsCtrl)
  .load(RoomCtrl)
  .load(SubRoomsCtrl)
  .load(SubRoomCtrl)
  .load(NewSubRoomService)
  .load(NewSubRoomCtrl)
  .load(LoginCtrl)
  .load(SignUpCtrl)
  .load(ProfileCtrl)
  .load(SettingsCtrl)
  .load(InputDirective)
  .load(CalendarFilter)
  .load(Routes);

// Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}

function onReady() {
  Angular.bootstrap(document, [App]);
}
