const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get(`/`, (req, res) => {
    let { lat, lng } = req.query
    if (lat === undefined || lat === `` || lng === undefined || lng === '')
        res.status(404).send(`No coords found`)
    else {
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
});

module.exports = router;