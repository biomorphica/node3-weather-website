const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b22530b31012440a9da944dd18e81d10/'+latitude+','+longitude

    request({url, json: true}, (error, {body}) => {
      if (error) {
        //   console.log('Unable to get response from weather service!')
        const errorMsg = 'Unable to get response from weather service!'
        callback( errorMsg, undefined)
      } else if (body.error){
        //   console.log('Unable to find location!')
        const errorMsg = 'Unable to find location!'
        callback( errorMsg, undefined)
      }  else {
        const data = body.daily.data[0]
        const current = body.currently
        const report = data.summary  + " It is currently "+current.temperature+" out. There is a "
        +(Number(current.precipProbability)*100).toString()+ " % chance of rain."
        callback(undefined, report)
      }
    })
}

module.exports = forecast