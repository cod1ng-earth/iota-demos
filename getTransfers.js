require('dotenv').config();
const IOTA = require('iota.lib.js');
const iota = new IOTA({
    'provider': process.env.IRI_URL
});
iota.api.getTransfers(process.env.CB_SEED, {}, (error, transfers) => {
    
    if (error) {
        console.error(error);
        return;
    }
    transfers.forEach(bundle => {
        bundle.forEach(t => {  
            let time = new Date(1000 * t.timestamp).toLocaleString();
            console.log(`${time} hash:${t.hash} value:${t.value} bundle:${t.bundle}} `);
        })
    })
});
