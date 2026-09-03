// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouritesDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {

    static addToFavourites(homeId, callback) {
        Favourite.getFavourites((favourites) => {
            if (favourites.includes(homeId)) {
                callback(new Error(`Home with ID ${homeId} is already in favourites.`));
            } else {
                favourites.push(homeId);
                fs.writeFile(favouritesDataPath, JSON.stringify(favourites), callback);
            };
        });
    }

    static getFavourites(callback) {
        fs.readFile(favouritesDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : [])
        });
    }

    static removeFromFavourites(homeId, callback) {
        this.getFavourites((favourites) => {
            const updatedFavourites = favourites.filter(id => id !== homeId);
            fs.writeFile(favouritesDataPath, JSON.stringify(updatedFavourites), callback);
        });
    }
};
