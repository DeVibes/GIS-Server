const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get(`/`, (req, res) => {
    let { searchQuery } = req.query
    if (!Boolean(searchQuery))
        res.status(404).send(`No address found`)
    else {
        fetch(`${process.env.GET_SEARCH_ADDRESS_REQ}`+
        `inputtype=textquery&fields=formatted_address,name,`+
        `geometry&key=${process.env.GOOGLE_MAPS_API_KEY}`+
        `&input=${searchQuery} st`
        )
        .then((response) => response.json())
        .then(responseJson => {
            res.send(responseJson)
        })
        .catch((err) => {
            console.log(err)
        })
    }
});

module.exports = router;