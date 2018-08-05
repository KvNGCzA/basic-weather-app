const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a: {
        demand : true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

geocode.geocodeAdd(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(JSON.stringify(results, undefined, 2)); 
        
        weather.getWeather(results.latitude, results.longitude, (errorMsg, weatherResults) => {
            if(errorMsg){
                console.log(errorMsg);
            }
            else{
                console.log(`Here is the weather report at ${results.address}. Its a ${weatherResults.summary.toLowerCase()} day with a temperature of ${weatherResults.currentTemperature} degrees celsius and a humidity of ${weatherResults.humidity}.`);
                
            }
        }); //end of weather.getWeather function
    }        
});


