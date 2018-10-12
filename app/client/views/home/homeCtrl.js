angular.module('reg')
  .controller('HomeCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'AuthService',
    function ($scope, $http, $state, settings, Utils, AuthService, $location) {

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });

      $scope.homeState = 'home';

      var loginStatus = false

      if (sessionStorage.getItem('status') == 'login') {
        $scope.loginStatus = true;
      }

      $scope.homeregister = function () {
        window.location = ($scope.loginStatus ? "/dashboard" : "/login");
      };
    }
  ]);
