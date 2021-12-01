const express = require("express")
const router = express.Router()


const Reservedflight = require("../Models/reservedflight")




router.get("/", (req, res) => {
    Reservedflight.find()
        .then( (reservedflights) => {
            //res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})

router.get("/:getID", (req, res) => {
    let ID = req.params.getID

    Reservedflight.findById(ID)
        .then( (reservedflights) => {
            //res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})


// Create
router.post("/", (req, res) => {
    let newFlight = new Reservedflight(req.body.flight)

    newFlight.save()
        .then( (reservedflights) => {
            //res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            if (err.name === "ValidationError") {
                let errors = {}
          
                Object.keys(err.errors).forEach((key) => {
                  errors[key] = err.errors[key].message
                })
          
                //return res.status(400).send(errors)
                return res.send(errors)
              }
            
            if (err.name === "MongoServerError") {
                //return res.status(400).send("duplicate key error")
                return res.send("duplicate key error")
            }

            //res.status(500).send(err.name)
            res.send(err.name)
            console.log(err.message)})
})




router.delete("/:deleteID", (req, res) => {
    let ID = req.params.deleteID

    Reservedflight.findByIdAndDelete(ID)
        .then( (reservedflights) => {
            //res.status(200)
            res.json(reservedflights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})

/*----------------------------------------------------------------------------------------------------*/

module.exports = router