const express = require("express");
const Meetups = require("../models/meetup")

const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const meetups = await Meetups.find();
        res.json(meetups);
    } catch ({message}) {
        res.status(500).json(message);
    }
})

router.put(`/`, async (req, res) => {
    let filterOptions = req.body
    try {
        let meetups = await Meetups.find();
        meetups = meetups.filter(meetup => meetup.attendants.includes(filterOptions.attendance))
        meetups = meetups.filter(meetup => filterOptions.categories.includes(meetup.category) )
        res.json(meetups)
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
        coords: req.body.coords,
        admin: req.body.admin,
        maxAttendants: req.body.maxAttendants,
        attendants: req.body.attendants,
    })

    try {
        let dbResult = await meetup.save()
        res.json(dbResult)

    } catch(err) {
        res.status(500).send(err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const meetup = await Meetups.findById(req.params.id);
        
        const updatedObj = {
            name: req.body.name || meetup.name,
            category: req.body.category || meetup.category,
            date: req.body.date || meetup.date,
            address: req.body.address || meetup.address,
            coords: req.body.coords || meetup.coords,
            maxAttendants: req.body.maxAttendants || meetup.maxAttendants,
            attendants: req.body.attendants || meetup.attendants,
        }

        const update = await Meetups.updateOne(
            { _id: req.params.id },
            { $set: updatedObj }
        );

        const updatedMeetup = await Meetups.findById(req.params.id);

        res.json(updatedMeetup);
        
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete(`/`, async (req, res) => {
    try {
        const result = await Meetups.remove()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router