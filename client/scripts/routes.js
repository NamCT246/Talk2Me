import { _ } from 'meteor/underscore';
import { Config, Runner } from 'angular-ecmascript/module-helpers';

import roomsTemplateUrl from '../templates/rooms.html';
import roomTemplateUrl from '../templates/room.html';
import subroomsTemplateUrl from '../templates/subrooms.html';
import subroomTemplateUrl from '../templates/subroom.html';
import loginTemplateUrl from '../templates/login.html';
import signupTemplateUrl from '../templates/signup.html';
import settingsTemplateUrl from '../templates/settings.html';
import profileTemplateUrl from '../templates/profile.html';
import tabsTemplateUrl from '../templates/tabs.html';

class RoutesConfig extends Config {
  constructor() {

    super(...arguments);
    this.isAuthorized = ['$auth', this.isAuthorized.bind()];

  }
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: tabsTemplateUrl,
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: loginTemplateUrl,
        controller: 'LoginCtrl as logger'

      })
      .state('signup', {
        url: '/signup',
        templateUrl: signupTemplateUrl,
        controller: 'SignUpCtrl as signUp'

      })
      .state('profile', {
        url: '/profile',
        templateUrl: profileTemplateUrl,
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
          templateUrl: settingsTemplateUrl,
           controller: 'SettingsCtrl as settings',
          }
        }
      })
      .state('tab.rooms', {
        url: '/rooms',
        views: {
          'tab-rooms': {
            templateUrl: roomsTemplateUrl,
            controller: 'RoomsCtrl as rooms'
          }
        }
      })
      .state('tab.room', {
        url: '/rooms/:roomId',
        views: {
          'tab-rooms': {
            templateUrl: roomTemplateUrl,
            controller: 'RoomCtrl as room'
          }
        }
      })
      .state('tab.subrooms', {
        url: '/subrooms',
        views: {
          'tab-subrooms': {
            templateUrl: subroomsTemplateUrl,
            controller: 'SubRoomsCtrl as subrooms'
          }
        }
      })
      .state('tab.subroom', {
        url: '/subrooms/:subRoomId',
        views: {
          'tab-subrooms': {
            templateUrl: subroomTemplateUrl,
            controller: 'SubRoomCtrl as subroom'
          }
        }
      });

    this.$urlRouterProvider.otherwise('/login');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}

RoutesRunner.$inject = ['$rootScope', '$state'];

export default [RoutesConfig, RoutesRunner];
