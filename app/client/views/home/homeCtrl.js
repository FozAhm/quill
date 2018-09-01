angular.module('reg')
  .controller('HomeCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'AuthService',
    function($scope, $http, $state, settings, Utils, AuthService){
        $scope.homeState = 'home';
    }
  ]);
