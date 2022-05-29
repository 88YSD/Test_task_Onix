const express = require('express')
const wcc = require('world-countries-capitals')
const api = express()

const HOST = 'localhost'
const PORT = 3000

api.get('/capitals', (req, res) => {

    let respData = null
    let status = 200
    let queryCountry = req.query.country;
    if (!queryCountry) {
        respData = 'Country query param is required'
        status = 400
    } else {
        let countryData = wcc.getCountryDetailsByName(queryCountry)
        if (!countryData[0]) {
            respData = 'There is no such country!'
            status = 404
        } else {
            countryData = countryData[0]
            queryCountry = queryCountry[0].toUpperCase() +
                queryCountry.substring(1)
            let capital = countryData.capital[0].toUpperCase() +
                countryData.capital.substring(1)
            respData = `The capital of ${queryCountry} is ${capital}`
        }
    }
    res.status(status).send(respData)
})

api.listen(PORT, () => { console.log('Server started!') })
