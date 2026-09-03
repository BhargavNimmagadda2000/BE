
const { getDB } = require('../utils/database');
const { ObjectId } = require('mongodb');


module.exports = class Favourite {
    constructor(homeId) {
        this.homeId = homeId;
      }

    save() {
        const db = getDB();
        return db.collection('favourites').findOne({homeId: this.homeId}).then(
            existingFavourite => {
                if (!existingFavourite) {
                    return db.collection('favourites').insertOne({homeId: this.homeId});
                }
                return Promise.resolve(existingFavourite);
            }
        );
    }
    static getFavourites() {
        const db = getDB();
        return db.collection('favourites').find().toArray();
    }

    static removeFromFavourites(homeId) {
        const db = getDB();
        return db.collection('favourites').deleteOne({homeId: homeId});
    }
};
