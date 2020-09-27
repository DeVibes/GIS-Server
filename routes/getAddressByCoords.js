const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get(`/`, (req, res) => {
    let { lat, lng } = req.query
    if (lat && lng) {
        fetch(`${process.env.GET_COORDS_REQ}?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then((response) => response.json())
        .then(responseJson => {
            console.log(`Got the address! ${responseJson.results[0].formatted_address}`)
            res.send(responseJson.results[0].formatted_address)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else {
        res.status(404).send(`No coords found`)
    }
});

module.exports = router;