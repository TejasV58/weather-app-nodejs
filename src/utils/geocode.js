const request = require('request')

const geocode = (address,callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidGVqYXN2NTUiLCJhIjoiY2tzOTByMDdmMGxzbDJ3cGYyZmN1MG8yYSJ9.CjpcIF-T2zxX23mfLVTySA&limit=1"

    request({url:geocodeurl,json:true},(error,{body})=>{
        if (error){
            callback('Can not connect to location service', undefined)
        } else if (body.features.length === 0 ) {
            callback('Can not find the location', undefined)
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
