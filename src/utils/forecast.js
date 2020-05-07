const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const  url = 'https://api.darksky.net/forecast/22110ae37c7890c3e32bbf372a5a555a/' + latitude + ',' + longitude
    request({ url, json:true }, (error,{body}) => {
       if (error) {
           callback('Unable to connect to weather services.', undefined)
       }else if (body.error) {
           callback('Unable to find the location. Try another search.', undefined)
        }else{
            callback(undefined,body.daily.data[1].summary + ' It is currently ' + body.currently.temperature + ' degrees farenhite out' +'.'+ ' There is ' + body.currently.precipProbability + '% chance of rain.')

        } 

    })
}


module.exports = forecast