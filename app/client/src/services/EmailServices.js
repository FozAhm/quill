angular.module('reg')
  .factory('EmailServices', [
  '$http',
  function($http){

    var base = '/api';

      return {
          sendMassEmail: function (filter, adminEmail, subject, title, text) {
              return $http.post(base + '/sendMassEmail',
                  {
                      filter: filter,
                      adminEmail: adminEmail,
                      subject: subject,
                      title: title,
                      text: text,
                  });
          }
      };
  }
  ]);
