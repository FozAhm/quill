angular.module('reg')
    .controller('AdminSmsCtrl', [
        '$scope',
        'currentUser',
        'SmsServices',
        function ($scope, currentUser, SmsServices) {
            $scope.email = {};
            _setupForm();

            function _setupForm(){
                $('.ui.form')
                    .form({
                        to: {
                            identifier: 'to',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a destinations'
                                }
                            ]
                        },
                        message: {
                            identifier: 'message',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter a message'
                                }
                            ]
                        }
                    });
            }

            $scope.sendSms = function () {
                if ($('.ui.form').form('is valid')) {
                    SmsServices
                        .sendMassSms(
                            $scope.sms.to,
                            $scope.sms.message
                        ).success(response => {
                            swal('SMS sent', 'SMS has been sent successfully!', "success");
                        }).error(response => {
                            swal('SMS not sent to certain numbers', response.message, "error");
                        });
                }
                else {
                    sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
                }
            };
        }]);
