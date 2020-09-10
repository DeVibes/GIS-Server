
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get(`/`, (req, res) => {
    let { lat, lng } = req.query
    if (lat === undefined || lng === undefined)
        res.status(404).send(`No coords found`)
    else {
        fetch(`${process.env.GET_COORDS_REQ}?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then((response) => response.json())
        .then(responseJson => res.send(responseJson.results[0].formatted_address))
        .catch((err) => {
            console.log(err)
        })
    }
});

module.exports = router;