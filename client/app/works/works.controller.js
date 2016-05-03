'use strict';
(function(){

class WorksComponent {

  constructor($http, $scope, socket, Auth) {

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.user = Auth.getCurrentUser();

    this.message = 'Biiiiiiiiitccchhhh';
    this.worksView = [];
  }

  $onInit() {
    this.$http.get('/api/work').then(response => {
      this.worksView = response.data;

      console.log(this.worksView);
      this.socket.syncUpdates('work', this.worksView);
    });
  }

  addWork() {
    var work = {
      description: this.newWork.description,
      title: this.newWork.title,
      image: '/assets/work.png',
      tags: [ 'ink', 'work', 'here' ],
      email: this.user.email,
      name: this.user.name,
      _creator: this.user._id
    };

    if (work) {
      this.$http.post('/api/work', work)
      .then(function(data) {
        console.log('posted from frontend success');
        console.log(data);
      })
      .catch(function() {
        console.log('failed to post from frontend ');
      });
      this.newWork.description = '';
      this.newWork.title = '';
    }
    

  }

  deleteWork(work) {
    this.$http.delete('/api/work/' + work._id)
    .then(function(data) {
      console.log('delete posted from frontend success');
      console.log(data);
    })
    .catch(function() {
      console.log('failed to post from frontend ');
    });
  }
}

angular.module('portfolioApp')
  .component('works', {
    templateUrl: 'app/works/works.html',
    controller: WorksComponent
  });

})();
