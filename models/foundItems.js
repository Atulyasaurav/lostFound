const getDb = require("../utils/database").getDb;

const mongodb = require("mongodb");

class FoundItems {
    constructor(itemName,itemCategory,contactNumber,description, urlImage,category){
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.contactNumber = contactNumber;
        this.description = description;
        this.urlImage = urlImage;
        this.category = category
    }

    save(){
        const db = getDb();
        var dbOpt;
        if(this._id){
            //bottel edited
            dbOpt = db.collection("found").updateOne({_id:this._id},{$set:this});
            console.log("item Updated into found");
        }else{
            dbOpt = db.collection("found").insertOne(this);
            console.log("item inserted into found");
        }

        return dbOpt
            .then(result => console.log("Item saved into found"))
            .catch(err => console.log(err));

    }

    static fetchAll(){
        const db = getDb();
        return db.collection('found').find().toArray()
            .then(product=>{
                console.log("fetchAll successfull in found")
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(id){
        const db = getDb();
        return db.collection("found").deleteOne({_id:new mongodb.ObjectId(id)})
            .then(result => {
                console.log("deleted successfull in found");
                return result;
            })
            .catch(err=>console.log(err))
    }



}

module.exports = FoundItems;