import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Meteor } from 'meteor/meteor';

export default class SignUpCtrl extends Controller{
	constructor(){
		super(...arguments);
	}

	signup(){
		var newusername = document.getElementById("newUserName").value;
		var newpassword = document.getElementById("newUserPassword").value;

		Accounts.createUser({username: newusername, password : newpassword}, (err) => {
          if (err) {
						var alertPopup = this.$ionicPopup.alert({
							title: 'Notification',
							template: "Registration failed!"
						});
          } else {
			 			this.$state.go('profile');
          }
        });
	  }
	}
SignUpCtrl.$name = 'SignUpCtrl';
SignUpCtrl.$inject = ['$state','$ionicPopup'];
