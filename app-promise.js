const yargs = require('yargs');
const axios =require('axios');

const argv = yargs.options({
    a: {
        demand : true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

const encodedAdd = encodeURIComponent(argv.a);
const getCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`;

axios.get(getCodeURL).then( response =>{
    if(response.data.status === "ZERO_RESULTS"){
        throw new Error('Unable to find that address');
    }    
    console.log(`Address: ${response.data.results[0].formatted_address}`); 
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let wetURL = `https://api.darksky.net/forecast/e985b42e8ba160e22596c108a3d251ad/${lat},${lng}`;
    return axios.get(wetURL);
}).then( wResponse => {
    let temp = wResponse.data.currently.temperature;
        console.log(`Temperature: ${temp} degrees`);
    }).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to reach API');   
    }else{
        console.log(e.message);
    }
});



