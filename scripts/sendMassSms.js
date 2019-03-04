require('dotenv').load();

// Usage:
//   - Add your Twilio account SID, auth token and phone number to .env
//   - Replace the value of `var message` with the message you wish to send.
//   - From the root directory, run `node scripts/sendMassSms.js`
//   - Terminate the script with ctrl-C
// Note: all phone numbers must be in the format +15551234567

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

var mongoose        = require('mongoose');
var database        = process.env.DATABASE || "mongodb://localhost:27017/test";
mongoose.connect(database);

var UserController = require('../app/server/controllers/UserController');

// Change this to the message you want to send
var message = "It's time for lunch! Come to the lunch room to get your food :)";

UserController.getAll(function(err, data) {
    data.forEach(function (user) {
        const number = user.confirmation.phoneNumber;
        if (!!number) {
            console.log("Sending message to " + number);
            client.messages
                .create({
                    body: message,
                    from: process.env.TWILIO_FROM_NUMBER,
                    to: number
                })
                .then(message => console.log(message.sid));
        }
    });
});
