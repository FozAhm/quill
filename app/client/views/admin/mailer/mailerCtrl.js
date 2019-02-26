angular.module('reg')
    .controller('MailerCtrl', [
        '$scope',
        'currentUser',
        'EmailServices',
        function ($scope, currentUser, EmailServices) {
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
                    title: {
                        identifier: 'title',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter a title'
                            }
                        ]
                    },
                    subject: {
                        identifier: 'subject',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter a subject'
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

            $scope.sendEmail = function() {
                if ($('.ui.form').form('is valid')){
                    EmailServices
                        .sendMassEmail(
                            $scope.email.to,
                            "contact@warhacks.ca",
                            $scope.email.subject,
                            $scope.email.title,
                            $scope.email.message
                        ).success(() => {
                            swal('Email sent','Email has been sent successfully!', "success");
                          }).error(() => {
                            swal('Email not sent','Email has not been sent successfully...', "error");
                          });
                  }
                  else {
                    sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
                  }
            };
        }]);
