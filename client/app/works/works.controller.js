'use strict';
(function(){

class WorksComponent {

  constructor($http, $scope, socket, Auth, $modal, Upload) {

    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.user = Auth.getCurrentUser();
    this.Upload = Upload;

    this.message = 'Biiiiiiiiitccchhhh';
    this.worksView = [];


    this.myModal = $modal({
      scope: this.$scope,
      show: false
    });
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
      image: [ '572a50ab7d966de608328be6', '572a50ab7d966de608328be7', '572a50ab7d966de608328be8' ],
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

  uploadImage(file) {
    var el = this;
    console.log(el);
    console.log(file);
    // Add to image object then to works object.
    console.log(this.newImage);

    file.upload = this.Upload.upload({
      url: 'api/image/',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      file: file,
      data: {
        title: this.newImage.title,
        description: this.newImage.description,
        email: this.user.email,
        name: this.user.name,
        _creator: this.user._id
      }
    });
    

    file.upload.then(function (response) {
        file.result = response.data;
        console.log(response.data);
    }, function (response) {
      if (response.status > 0) {
        console.log(response.data);
      }
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      el.$scope.picFile = '';
    });

    /*
    var image = {
      description: this.newImage.description,
      title: this.newImage.title
    };

    if (image) {
      this.$http.post('/api/image', image)
      .then(function(data) {
        console.log('posted from frontend success');
        console.log(data);
      })
      .catch(function() {
        console.log('failed to post from frontend ');
      });
      this.newImage.description = '';
      this.newImage.title = '';
    }*/

  }




  // Other helpful Functions


  showModal() {
    this.myModal.$promise.then(this.myModal.show);
  }
}

angular.module('portfolioApp')
  .component('works', {
    templateUrl: 'app/works/works.html',
    controller: WorksComponent
  });

})();
