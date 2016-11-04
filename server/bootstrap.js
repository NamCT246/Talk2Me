import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import { globalRooms } from '../lib/collections';

Meteor.startup(function() {
	if (globalRooms.find().count() !== 0) return;

	const global_rooms = [
		{
			name: "Coding",
			timestamp: Moment().subtract(2, 'hours').toDate()
		},
		{
			name: "Art",
			timestamp: Moment().subtract(1, 'days').toDate()
		}
	];
	  global_rooms.forEach((r) => {

   	  globalRooms.insert(r);

  });
});