import { Service } from 'angular-ecmascript/module-helpers';
import newSubRoomTemplateUrl from '../../templates/new-subroom.html';

export default class NewSubRoomService extends Service {

  constructor() {
    super(...arguments);

    this.templateUrl = newSubRoomTemplateUrl;

  }

  showModal() {

    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })

    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });

  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

NewSubRoomService.$name = 'NewSubRoom';

NewSubRoomService.$inject = ['$rootScope', '$ionicModal'];

