angular.module('reg')
    .factory('SmsServices', [
        '$http',
        function($http){

            var base = '/api';

            return {
                sendMassSms: function (filter, text) {
                    return $http.post(base + '/sendMassSms',
                        {
                            filter: filter,
                            text: text,
                        });
                }
            };
        }
    ]);
