const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    homeId: { 
        type: mongoose.Schema.Types.ObjectId, //its a string but we use ObjectId to refer to the Home model. earlier we used to import ObjectID from mongo, now its diretcly referenced
        ref: 'Home', // collection it belongs to
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Favourite', favouriteSchema);