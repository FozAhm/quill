// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

var Sms = {};

/**
 * Sends a text message to a phone number
 * @param {*} number
 * @param {*} message
 * @param {*} callback
 */
Sms.sendSms = function (number, message, callback) {
    console.log("Sending message to " + number);
    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_FROM_NUMBER,
            to: number
        })
        .then((res) => {
            callback(res.status, null);
        })
        .catch(e => {
          console.log('error sending sms : ' + e.message)
          callback(null, e)
        }) 
};

module.exports = Sms;
