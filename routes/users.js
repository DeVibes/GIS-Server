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
        let dbResult = await user.save()
        res.json(dbResult)
    } catch (error) {
        res.status(500).send(err)
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

router.get(`/:username`, async (req, res) => {
    try {
        const user = await Users.find( {username: req.params.username} );
        if (user.length == 0) {
            res.status(404).json(`User was not found`)
        }
        else if (user[0].password != req.body.password){
            res.status(401).json(`Password missmatch`)
        }
        else res.json(user[0]);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
