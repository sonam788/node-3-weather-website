const request = require('request');

const geocode = (address, callback)=>{
    
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29uYTAxIiwiYSI6ImNrN24zdWZyMzA4a3AzZWp3dGk3bndsZHQifQ.vR3vaEeMGTX93xY1ho9vqg&limit=1'
    request({url, JSON:true},(error,{body})=>{
      const dataObject = JSON.parse(body);
        if(error){
            callback('unable to connect',undefined)
        } 
        else{
            callback(undefined, {
               latitude:dataObject.features[0].center[1],
               longitude:dataObject.features[0].center[0],
               location: dataObject.features[0].place_name
            })
        }
    })
  }

  module.exports = geocode