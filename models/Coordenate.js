const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordenateSchema = new Schema({
    country: String,
    lat: Number,
    lng: Number,
    rad: Number,
    radUnits: String //mi (miles) or  km (kilometers)
   
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

var Coordenate = mongoose.model("Coordenate", coordenateSchema);
module.exports = Coordenate;