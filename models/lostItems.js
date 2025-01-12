const getDb = require("../utils/database").getDb;

const mongodb = require("mongodb");

class LostItems {
    constructor(itemName,itemCategory,contactNumber,description, urlImage, category) {
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
            dbOpt = db.collection("lost").updateOne({_id:this._id},{$set:this});
            console.log("item Updated into lost");
        }else{
            dbOpt = db.collection("lost").insertOne(this);
            console.log("item inserted into lost");
        }

        return dbOpt
            .then(result => console.log("Item saved into lost"))
            .catch(err => console.log(err));

    }

    static fetchAll(){
        const db = getDb();
        return db.collection('lost').find().toArray()
            .then(product=>{
                console.log("fetchAll successfull in lost")
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(id){
        const db = getDb();
        return db.collection("lost").deleteOne({_id:new mongodb.ObjectId(id)})
            .then(result => {
                console.log("deleted successfull in lost");
                return result;
            })
            .catch(err=>console.log(err))
    }



}

module.exports = LostItems;