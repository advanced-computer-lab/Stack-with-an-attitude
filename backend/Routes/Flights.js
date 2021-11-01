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
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
})

router.get("/:getID", (req, res) => {
    let ID = req.params.getID

    Flight.findById(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
})


// Create
router.post("/", (req, res) => {
    let {
        flightNumber,
        departureTime,
        arrivalTime,
        date,
        economySeats,
        businessSeats,
        airport
    } = req.body

    let newFlight = new Flight({
        flightNumber,
        departureTime,
        arrivalTime,
        date,
        economySeats,
        businessSeats,
        airport
    })

    newFlight.save()
        .then( (flight) => {
            res.status(200)
            res.json(flight)
        })
        .catch( (err) => {
            res.status(500)
            console.log(err)})
})


// Update
router.put("/:updateID", (req, res) => {
    let ID = req.params.updateID

    let {
        flightNumber,
        departureTime,
        arrivalTime,
        date,
        economySeats,
        businessSeats,
        airport
    } = req.body

    Flight.findByIdAndUpdate(ID, {flightNumber, departureTime, arrivalTime, date, economySeats, businessSeats, airport})
        .then( (flights) => {
            res.status(200)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
    
    Flight.findById(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
})


// Delete
router.delete("/:deleteID", (req, res) => {
    let ID = req.params.deleteID

    Flight.findByIdAndDelete(ID)
        .then( (flights) => {
            res.status(200)
            res.json(flights)
        })
        .catch( (err) => {
            res.status(404)
            console.log(err)})
})

/*----------------------------------------------------------------------------------------------------*/

module.exports = router