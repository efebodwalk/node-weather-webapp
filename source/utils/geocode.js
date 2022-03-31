const request = require('request')

// standard callback method 
const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYm9kd2Fsazk5IiwiYSI6ImNsMGI0NTEycTA3ODAzY3QzMmFhOHRvZ2QifQ.gcVKFGPSxJymmoEmorWjhQ&limit=1'
 // standard way of using request npm 
 request ({url, json:true},(error, {body}) =>{
 
    if (error){
        callback('Unable to conect to Location services', undefined)
    }else if(body.features.length === 0 ) {
       callback('Unable to find location.Try another search', undefined)
    } else {
       callback (undefined, {
          lat: body.features[0].center[0],
          lon: body.features[0].center[1],
          location: body.features[0].place_name
       })
    }
 } )
 
 }

 module.exports = geocode 
 