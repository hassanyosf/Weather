const request = require('postman-request')

const forecast = ({ latitude, longitude }, callback) => {
    setTimeout(() => {
        const weatherUrl = `http://api.weatherstack.com/current?access_key=392c7fb871c8d02b170bf7fd3f6f0fe5&query=${latitude},${longitude}&units=m`
        request({ url: weatherUrl, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. It is feels like ' + body.current.feelslike + ' degrees out.')
            }
        })
    }, 2000)
}
module.exports = forecast