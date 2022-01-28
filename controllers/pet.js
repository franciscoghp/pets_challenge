const { response } = require('express');

const Pet = require('../models/pet');
const Owner = require('../models/owner');

const petsGet = async(req, res = response) => {
    try {
        const { owner_id } = req.params;

        const data = await Pet.find({ owner_id });
    
        res.json({
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }
}

const petsPost = async(req, res = response) => {
    try {
        const { name, type, owner_id } = req.body;

        let owner = await Owner.findById({_id : owner_id});
    
        if(!owner){
            return res.status(400).json({
                msg: "The owern doesn't exist"
            })
        }
    
        const pet = new Pet({ 
            name, 
            type,
            owner_id,
            owner: `${owner.name} ${owner.lastname}`
        } );
    
        owner.pets.push(pet);
        res.status(201).json({
            pet,
            message: 'La mascota fue agregada'
        });
    
        // Guardar en BD
        await pet.save();
        await owner.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }
}

const petsPut = async(req, res = response) => {

    try {
        const { id } = req.params;

        const { name,  owner: owner_id, type } = req.body;

        let owner = await Owner.findById({_id : owner_id});
        await Pet.findByIdAndUpdate({_id: id}, {
             name, 
             owner: `${owner.name} ${owner.lastname}`, 
             type 
        });

        res.json({
            msg: 'La mascota fue editada con éxito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }
}

const petsDelete = async(req, res = response) => {
    try {
        const { id } = req.params;

        let pet = await Pet.findById({_id : id});
        let owner = await Owner.findById({_id : pet.owner_id});
        let pets = [];
        owner.pets.map( iten=>{
            if( iten._id != id ) pets.push(iten)
        })

        owner.pets = pets;

        await owner.save()
        await Pet.findByIdAndRemove( id );

        res.json({
            message: 'La mascota fue eliminada'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }

}




module.exports = {
    petsGet,
    petsPost,
    petsPut,
    petsDelete,
}