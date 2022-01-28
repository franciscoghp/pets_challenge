const { Schema, model } = require('mongoose');

const OwnerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    pets: {
        type: Array,
        default: []
    }
});

OwnerSchema.methods.toJSON = function() {
    const { __v, _id, ...owner  } = this.toObject();
    owner.id = _id;
    return owner;
}

module.exports = model( 'Owner', OwnerSchema );
