const express = require("express");
const Meetups = require("../models/meetup")

const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const meetups = await Meetups.find();
        res.json(meetups);
    } catch (error) {
        console.log(error)
    }
})

router.get(`/:id`, async (req, res) => {
    try {
        const meetup = await Meetups.findById(req.params.id);
        res.json(meetup);
    } catch (error) {
        console.log(error)
    }
})

router.post(`/`, async (req, res) => {
    const meetup = new Meetups({
        name: req.body.name,
        category: req.body.category,
        address: req.body.address,
        date: req.body.date,
        coords: req.body.coords
    })

    try {
        let dbResult = await meetup.save()
        res.json(dbResult)

    } catch(err) {
        res.status(500).send(err)
    }
})

router.post(`/remove`, async (req, res) => {
    try {
        const result = await Meetups.remove()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router