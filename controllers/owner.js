const { response } = require('express');

const Owner = require('../models/owner');
const Pet = require('../models/pet');

const ownersGet = async(req, res = response) => {
    try {
        const data = await Owner.find({})
    
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

const ownersPost = async(req, res = response) => {
    try {
        const { name, lastname } = req.body;

        const owner = new Owner({ 
            name, 
            lastname 
        } );

        res.status(201).json({
            owner,
            message: 'El dueño fue agregado'
        });
    
        // Guardar en BD
        await owner.save();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }
}

const ownersPut = async(req, res = response) => {
    try {
        const { id } = req.params;

        const { name,  lastname } = req.body;
        await Owner.findByIdAndUpdate({_id: id}, { name,  lastname });

        res.json({
            msg: 'El dueño fue editado con éxito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }
}

const ownersDelete = async(req, res = response) => {

    try {
        const { id } = req.params;
        const owner = await Owner.findById({_id: id});

        owner.pets.map( async iten=>{
            await Pet.findByIdAndRemove( iten._id );
        });

        await Owner.findByIdAndRemove( id );
        res.json({
            message: 'el owner con eliminado '
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something its wrong'
        })
    }

}




module.exports = {
    ownersGet,
    ownersPost,
    ownersPut,
    ownersDelete,
}