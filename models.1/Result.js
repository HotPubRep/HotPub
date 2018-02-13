const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    text: String,
    emotion: {name: String, value: Number},
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    coordenate_id: {
        type: Schema.Types.ObjectId,
        ref: "Result"
    }
   
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

var Result = mongoose.model("Result", resultSchema);
module.exports = Result;