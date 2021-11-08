// Imports
const express = require("express")
const router = express.Router()

// Model
const Flight = require("../Models/Flight")

/*----------------------------------------------------------------------------------------------------*/

// Read
router.get("/", (req, res) => {
    Flight.find()
        .then( (flights) => {
            //res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})

router.get("/:getID", (req, res) => {
    let ID = req.params.getID

    Flight.findById(ID)
        .then( (flights) => {
            //res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})


// Create
router.post("/", (req, res) => {
    let newFlight = new Flight(req.body.flight)

    newFlight.save()
        .then( (flight) => {
            //res.status(200)
            res.json(flight)
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


// Update
router.put("/:updateID", (req, res) => {
    let ID = req.params.updateID

    Flight.findByIdAndUpdate(ID, req.body.flight, {new: true, runValidators: true})
        .then( (flights) => {
            //res.status(200)
            res.json(flights)
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


// Delete
router.delete("/:deleteID", (req, res) => {
    let ID = req.params.deleteID

    Flight.findByIdAndDelete(ID)
        .then( (flights) => {
            //res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            //res.status(404)
            console.log(err)})
})

/*----------------------------------------------------------------------------------------------------*/

module.exports = router