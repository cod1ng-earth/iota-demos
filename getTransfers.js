require('dotenv').config();

const IOTA = require('iota.lib.js');

const iota = new IOTA({
    'provider': process.env.IRI_URL
});
const options = {};   
console.log(process.env.CB_SEED);
iota.api.getTransfers(process.env.CB_SEED, options, (error, transfers) => {
    
    if (error) {
        console.error(error);
        return;
    }
 
    console.dir(transfers);
});
