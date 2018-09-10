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

      $scope.homeregister = function () {
        window.location = "/login";
      };
    }
  ]);
