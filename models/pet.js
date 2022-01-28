const { Schema, model } = require('mongoose');

const PetSchema = Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: [true, 'Owner id is required']
    },
    owner: {
        type: String,
        required: [true, 'Owner is required']
    },

});

PetSchema.methods.toJSON = function() {
    const { __v, _id, ...pet  } = this.toObject();
    pet.id = _id;
    return pet;
}

module.exports = model( 'Pet', PetSchema );
