angular.module("reg").controller("ConfirmationCtrl", [
    "$scope",
    "$rootScope",
    "$state",
    "currentUser",
    "Utils",
    "UserService",
    "HIDDEN",
    function(
        $scope,
        $rootScope,
        $state,
        currentUser,
        Utils,
        UserService,
        HIDDEN
    ) {
        // Set up the user
        var user = currentUser.data;
        $scope.user = user;
        $scope.HIDDEN = HIDDEN;
        $scope.pastConfirmation = Date.now() > user.status.confirmBy;

        $scope.formatTime = Utils.formatTime;

        _setupForm();

        $scope.fileName =
            user._id + "_" + user.profile.name.split(" ").join("_");

        // -------------------------------
        // All this just for dietary restriction checkboxes fml

        var dietaryRestrictions = {
            Vegetarian: false,
            Vegan: false,
            Halal: false,
            Kosher: false,
            "Nut Allergy": false
        };

        if (user.confirmation.dietaryRestrictions) {
            user.confirmation.dietaryRestrictions.forEach(function(
                restriction
            ) {
                if (restriction in dietaryRestrictions) {
                    dietaryRestrictions[restriction] = true;
                }
            });
        }

        $scope.dietaryRestrictions = dietaryRestrictions;

        // -------------------------------

        function _updateUser(u) {
            let consentReminder =
                "\n\n Reminder: Don't forget to upload your liability waiver form if you haven't already!";
            let uploadStatus = "";
            if (uploadStatus != null) {
                uploadStatus = u ? '\n Your liability waiver form upload was successful.' : '\n Your liability waiver form upload has failed.';
            }

            var confirmation = $scope.user.confirmation;
            // Get the dietary restrictions as an array
            var drs = [];
            Object.keys($scope.dietaryRestrictions).forEach(function(key) {
                if ($scope.dietaryRestrictions[key]) {
                    drs.push(key);
                }
            });
            confirmation.dietaryRestrictions = drs;

            UserService.updateConfirmation(user._id, confirmation)
                .success(function(data) {
                    sweetAlert(
                        {
                            title: "Woo!",
                            text: "You're confirmed! " + uploadStatus + consentReminder,
                            type: (u || u == null) ? "success" : "warning",
                            confirmButtonColor: "#F28123"
                        },
                        function() {
                            $state.go("app.dashboard");
                        }
                    );
                })
                .error(function(res) {
                    sweetAlert("Uh oh!", "Something went wrong.", "error");
                });
        }

        function _setupForm() {
            // Semantic-UI form validation
            $(".ui.form").form({
                fields: {
                    shirt: {
                        identifier: "shirt",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Please give us a shirt size!"
                            }
                        ]
                    },
                    phone: {
                        identifier: "phone",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Please enter a phone number."
                            }
                        ]
                    },
                    signatureLiability: {
                        identifier: "signatureLiabilityWaiver",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Please type your digital signature."
                            }
                        ]
                    },
                    signaturePhotoRelease: {
                        identifier: "signaturePhotoRelease",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Please type your digital signature."
                            }
                        ]
                    },
                    signatureCodeOfConduct: {
                        identifier: "signatureCodeOfConduct",
                        rules: [
                            {
                                type: "empty",
                                prompt: "Please type your digital signature."
                            }
                        ]
                    }
                }
            });
        }

        $scope.submitForm = function() {
            if ($(".ui.form").form("is valid")) {
                _uploadConsentForm((uploadResult) => {
                    _updateUser(uploadResult);
                });
            }
        };

        function _uploadConsentForm(callback) {
            console.log(angular.element("#fileToUpload"));
            var fd = undefined;

            if (angular.element("#fileToUpload")[0].files.length === 0) {
                console.log("Consent form not found");
                callback();
                return;
            }

            if (angular.element("#fileToUpload")[0]) {
                var files = angular.element("#fileToUpload")[0].files;

                fd = new FormData();
                const userFileName = $scope.fileName;
                // loop if multiples files
                for (var x = 0; x < files.length; x++) {
                    var patt1 = /\.[0-9a-z]+$/i;
                    const fileExtension = files[x]["name"].match(patt1);

                    if (fileExtension === "") {
                        alert("File uploaded must be a PDF");
                        callback();
                        return;
                    }

                    fd.append(
                        "file" + x,
                        files[x],
                        userFileName + fileExtension
                    );
                }

                AWS.config.region = $scope.HIDDEN.AWS_REGION; // Region
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: $scope.HIDDEN.AWS_CONFIG_POOL_ID,
                    RoleArn: $scope.HIDDEN.AWS_CONFIG_ROLE_ARN,
                    AccountId: $scope.HIDDEN.AWS_ACCOUNT_ID
                });
                AWS.config.update({
                    accessKeyId: $scope.HIDDEN.AWS_ACCESS_KEY_ID,
                    secretAccessKey: $scope.HIDDEN.AWS_SECRET_ACCESS_KEY
                });

                const Bucket = $scope.HIDDEN.AWS_BUCKET;
                
                const s3 = new AWS.S3({
                    apiVersion: "2006-03-01",
                    params: { Bucket }
                });

                let file = fd.get("file0");
                if (!file) {
                    callback();
                    return;
                }
                //build the params needed for the putObject call
                const params = {
                    Key: file.name,
                    Body: file,
                    ACL: "public-read" //this makes the object readable
                };

                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(
                            "There was an error uploading your document"                           
                        );
                        callback(false);
                        return;
                    } else {
                        callback(true);
                        return;
                    }
                });
            }
        }
    }
]);
