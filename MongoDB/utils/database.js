const mongodb = require('mongodb');

const MongoCLient = mongodb.MongoClient;

const mongoUrl = "momgoURL";

let _db;

const connectToMongo = (callback) => {
    MongoCLient.connect(mongoUrl).then((client) => {
        console.log(client);
        _db = client.db('airbnb');
        callback();
    }).catch((err) => {
        console.log(err);
    });
}

const getDB  = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No database found!');
}

module.exports = {
    connectToMongo,
    getDB
};