const express = require("express");
const Users = require("../models/user")

const router = express.Router();

router.post(`/`, async (req, res) => {
    const user = new Users({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        personName: req.body.personName
    })

    try {
        let count = await Users.find({username: req.body.username})
        if (count != 0) throw new Error('Username already exists')
        count = await Users.find({phone: req.body.phone})
    if (count != 0) throw new Error('Phone already exists')
        let dbResult = await user.save()
        res.json(dbResult)
    } catch ({message}) {
        res.status(500).json(message)
    }
})

router.delete(`/`, async (req, res) => {
    try {
        const result = await Users.remove()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

/* Auth user */
router.put(`/:username`, async (req, res) => {
    try {
        const user = await Users.find( {username: req.params.username} );
        if (user.length == 0) {
            res.status(404).json(`User was not found`)
        }
        else if (user[0].password != req.body.password){
            res.status(401).json(`Password missmatch`)
        }
        else res.json({
            username: user[0].username,
            personName: user[0].personName
        });
    } catch (error) {
        console.log(error)
    }
})

router.get(`/:username`, async (req, res) => {
    try {
        const user = await Users.find( {username: req.params.username} );
        if (user.length == 0) {
            res.status(404).json(`User was not found`)
        }
        else {
            console.log(`Get request for user!`)
            res.json(user[0]);
        }
    } catch (error) {
        console.log(error)
    }
})

router.patch(`/:id`, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)

        const updatedUser = {
            username: req.body.username || user.username,
            phone: req.body.phone || user.phone,
            personName: req.body.personName || user.personName,
            savedAddresses: req.body.savedAddresses || user.savedAddresses
        }

        const update = await Users.updateOne(
            { _id: req.params.id },
            { $set: updatedUser}
        )

        const updateUser = await Users.findById(req.params.id)
        console.log(`Patch request for user!`)
        res.json(updateUser)

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;
