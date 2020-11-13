const mongoose = require('mongoose');
const mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb;

function init() {
    const connectionString = prepareConnectionString(mongodbConfig);
    const options = {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true
    };

    mongoose.connect(connectionString, options)
        .then(function (result) {
            console.log("MongoDB connection successful. DB: " + connectionString);
        })
        .catch(function (error) {
            console.log(error.message);
            console.log("Error occurred while connecting to DB: : " + connectionString);
        });
}

function prepareConnectionString(config) {
    let connectionString = 'mongodb://';
    if (config.user) {
        connectionString += config.user + ':' + config.password + '@';
    }

    connectionString += config.server + '/' + config.database;
    return connectionString;
}

module.exports = {
    init: init
};
