import { Config } from 'angular-ecmascript/module-helpers';

export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html'
      })
      .state('tab.global-rooms', {
        url: '/global-rooms',
        views: {
          'tab-global-rooms': {
            templateUrl: 'client/templates/global-rooms.html',
            controller: 'GlobalRoomsCtrl as globalRooms'
          }
        }
      })
      .state('tab.global-room', {
        url: '/global-rooms/:roomId',
        views: {
          'tab-global-rooms': {
            templateUrl: 'client/templates/global-chat-room.html',
            controller: 'GlobalRoomCtrl as globalRoom'
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/global-rooms');
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];