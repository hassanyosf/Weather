const request = require('postman-request')


const geoCode = (address, callback) => {
    setTimeout(() => {
        const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFzc2FueW91c3NlZiIsImEiOiJja2p6NmtqenQwNGt4MnVuMjhjMjB1YzI5In0.tm7O8BtJRUlwJy1M8lgpBA&limit=1`
        request({ url: mapBoxUrl, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to mapbox service!', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }, 2000)
}

module.exports = geoCode