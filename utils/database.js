const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://atulya:1234@cluster0.qt7s9.mongodb.net/lostFoundItems?retryWrites=true&w=majority&appName=Cluster0')
        .then(client =>{
            console.log("Connected to  Database");
            _db = client.db();
            cb()
        })
        .catch(err=>{
            console.log("Connection error:");
            console.log(err);
            throw err;
        })
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw new Error("Database not initialized");
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
