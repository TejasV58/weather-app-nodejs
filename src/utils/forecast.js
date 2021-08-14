const request = require("request")

const forecast = (latitude,longitude,callback) =>{

    const url = "http://api.weatherstack.com/current?access_key=e02dc2343a7864ef567f2ca4c165f083&query="+latitude+","+longitude+"&units=f"

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Can not connect to location service",undefined)
        } else if (body.error) {
            callback("Can not find the location",undefined)
        } else {
            const {temperature,feelslike} = body.current
            callback(undefined,"It is currently "+temperature+" degrees outside.It feels like it is "+feelslike+" degree out.")
        }
    })
}

module.exports = forecast