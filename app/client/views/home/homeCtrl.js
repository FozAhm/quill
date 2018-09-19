angular.module('reg')
  .controller('HomeCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'AuthService',
    function ($scope, $http, $state, settings, Utils, AuthService, $location) {
      $scope.homeState = 'home';

      var loginStatus = false

      if(sessionStorage.getItem('status') == 'login'){
        $scope.loginStatus = true;
      }

      $scope.homeregister = function () {
        window.location = "/dashboard";
      };
    }
  ]);
