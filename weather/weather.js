const request = require('request');

getWeather = ( lat, lng, callback ) => {
    request({
        url: `https://api.darksky.net/forecast/e985b42e8ba160e22596c108a3d251ad/${lat},${lng}`,
        json: true
    }, (error, response, body) =>{
        if(error){
            callback("Unable to reach server");
        }else if(body.code === "400"){
            callback("Unable to fetch weather");
        }else{            
            callback(undefined, {
                summary: body.currently.summary,
                currentTemperature: body.currently.temperature,
                humidity: body.currently.humidity
            })
        }
    });
};

       

module.exports.getWeather = getWeather;