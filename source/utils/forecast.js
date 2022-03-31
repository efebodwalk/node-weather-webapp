const request = require('request')

const forecast = (lat,lon, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d477b069870dfac4830a8f2d7393c00&units=metric`
    request({url, json:true},(error,{body})=> {
        if (error){
           callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
           callback('Unable to find Location!',undefined)
        } else {
          callback(undefined,' It is currently ' + body.main.temp + ' degrees out')
         //callback(undefined, ' It is currently ' + response.body.main.temp + ' degrees out')
          }
    })
}
    

module.exports = forecast