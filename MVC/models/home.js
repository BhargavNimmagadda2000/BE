const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

module.exports = class Home {
    constructor(houseName, location, price, rating, photoUrl) {
        this.houseName = houseName;
        this.location = location;
        this.price = price;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save() {
        Home.fetchAll((registeredHomes) => {
            registeredHomes.push(this);
            const homeDataPath = path.join(rootDir,'data', 'homes.json');
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(callback) {
        const homeDataPath = path.join(rootDir,'data', 'homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }   
}