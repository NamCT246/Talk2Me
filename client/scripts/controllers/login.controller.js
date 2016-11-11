import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';

export default class LoginCtrl extends Controller{
	constructor(){
		super(...arguments);
	}

	login(){
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		Meteor.loginWithPassword(username, password, (error) => {
   		if(error) {
   		//	alert("Process failed: " + error.reason);
				var alertPopup = this.$ionicPopup.alert({
					title: 'Signup fail',
					template: error.reason
				});
   		} else{
   			this.$state.go('tab.rooms');
    		}
		})
	}
	signup(){
		this.$state.go('signup');
	}
}
LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state','$ionicPopup'];
