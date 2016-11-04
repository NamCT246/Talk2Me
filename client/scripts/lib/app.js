// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import RoutesConfig from '../routes';
import GlobalRoomsCtrl from '../controllers/rooms.controller';
import GlobalRoomCtrl from '../controllers/room.controller';

const App = 'Talk2Me';

// App
Angular.module(App, [
  'angular-meteor',
  'ionic'
]);

new Loader(App)
  .load(RoutesConfig)
  .load(GlobalRoomsCtrl)
  .load(GlobalRoomCtrl);

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