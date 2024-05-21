const express = require("express")
const EstateController = require("../controllers/estate.controller")
const router = express.Router()

router.get('/estates/', EstateController.getAllEstates)
router.get('/estate/:id', EstateController.getOneEstate)
router.get('/estates/available-for/:availableFor', EstateController.getEstateByAvailableFor)
router.get('/estates/owner/:owner', EstateController.getEstateByOwner)
router.post('/estate/', EstateController.createEstate)
router.put('/estate/:id', EstateController.updateEstate)
router.delete('/estate/:id', EstateController.deleteEstate)
router.get('/search/:city/:availableFor', EstateController.getEstateByCityAndAvailableFor)

module.exports = {
    estateRouter: router
}