const {Estate} = require('../models/estate.model')

const getAllEstates = (req, res) => {
    Estate.find({})
        .then(estates => res.json(estates))
        .catch(err => res.status(400).json(err))
}

const getOneEstate = (req, res) => {
    Estate.findOne({_id: req.params.id})
        .then(estate => {
            if(!estate) {
                res.status(404).json({
                    message: "We're sorry, but we couldn't find the estate you're looking for"
                })
            }else{
                res.json(estate)
            }
        })
        .catch(err => res.status(500).json(err))
}

const getEstateByAvailableFor = (req, res) => {
    Estate.find({availableFor: req.params.availableFor})
        .then(estate => res.json(estate))
        .catch(err => res.status(400).json(err))
}

const getEstateByCityAndAvailableFor = (req, res) => {
    Estate.find({city: req.params.city, availableFor: req.params.availableFor})
        .then(estate => res.json(estate))
        .catch(err => res.status(400).json(err))
} 

const getEstateByOwner = (req, res) => {
    Estate.find({owner: req.params.owner})
        .then(estate => res.json(estate))
        .catch(err => res.status(400).json(err))
}

const createEstate = (req, res) => {
    const {title, description, owner, phoneNumber, city, neighborhood, address, coordinates, price, image, bedrooms, bathrooms, rooms, availableFor} = req.body;
    Estate.create({
        title,
        description,
        owner,
        phoneNumber,
        city,
        neighborhood,
        address,
        coordinates,
        price,
        image,
        bedrooms,
        bathrooms,
        rooms,
        availableFor
    })
        .then(newEstate => res.json(newEstate))
        .catch(err => res.status(400).json(err))
}

const updateEstate = (req, res) => {
    const {title, description, owner, phoneNumber, city, neighborhood, address, coordinates, price, image, bedrooms, bathrooms, rooms, availableFor} = req.body;
    const body = {title, description, owner, phoneNumber, city, neighborhood, address, coordinates, price, image, bedrooms, bathrooms, rooms, availableFor}
    Estate.findOneAndUpdate({_id: req.params.id}, body, {new: true, runValidators: true})
        .then(updatedEstate => res.json(updatedEstate))
        .catch(err => res.status(400).json(err))
}

const deleteEstate = (req, res) => {
    Estate.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    getAllEstates,
    getOneEstate,
    getEstateByAvailableFor,
    getEstateByCityAndAvailableFor,
    getEstateByOwner,
    createEstate,
    updateEstate,
    deleteEstate
}