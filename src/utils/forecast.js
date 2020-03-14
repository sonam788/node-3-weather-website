const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url ='https://api.darksky.net/forecast/ddcd30781ca14fcb652cd02b10f59f02/'+latitude +',' +longitude

    request({url, JSON:true},(error, {body})=>{
        if(error){
            callback('Unable to connect', undefined)

        }else{
            const dataObject = JSON.parse(body);
            console.log(dataObject.daily.data[0])
             callback(undefined,dataObject.daily.data[0].summary +'It is currently' + dataObject.currently.temperature+
             'Degrees out this is high today.'+dataObject.daily.data[0].temperatureHigh +'with a low of:'+ dataObject.daily.data[0].temperatureLow +'.There is '
             +dataObject.currently.precipProbability+'% of chance of rain')

        }
    })
}

module.exports = forecast