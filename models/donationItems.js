const getDb = require("../utils/database").getDb;

const mongodb = require("mongodb");

class Donation {
    constructor(itemName,itemCategory,contactNumber,description, urlImage,category){
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.contactNumber = contactNumber;
        this.description = description;
        this.urlImage = urlImage;
        this.category = category;
    }

    save(){
        const db = getDb();
        var dbOpt;
        if(this._id){
            //bottel edited
            dbOpt = db.collection("donation").updateOne({_id:this._id},{$set:this});
            console.log("item Updated into donation");
        }else{
            dbOpt = db.collection("donation").insertOne(this);
            console.log("item inserted into donation");
        }

        return dbOpt
            .then(result => console.log("Item saved into donation"))
            .catch(err => console.log(err));

    }

    static fetchAll(){
        const db = getDb();
        return db.collection('donation').find().toArray()
            .then(product=>{
                console.log("fetchAll successfull in donation")
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(id){
        const db = getDb();
        return db.collection("donation").deleteOne({_id:new mongodb.ObjectId(id)})
            .then(result => {
                console.log("deleted successfull in donation");
                return result;
            })
            .catch(err => console.log(err));
    }



}

module.exports = Donation;