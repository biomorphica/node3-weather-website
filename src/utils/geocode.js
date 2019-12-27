const request = require('request')

const geocode = (address, callback) => {
    // console.log('geocode.address: '+address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmlvbW9ycGhpY2EiLCJhIjoiY2s0ZXI2ajBzMGVyaDNrcGUzaTRjYXYzcCJ9.4Vze5X6OgK1tcGCPf-pRlQ&limit=1'

    request({  url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode 