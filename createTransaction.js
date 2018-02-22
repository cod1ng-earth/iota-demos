require('dotenv').config();

const IOTA = require('iota.lib.js');

const iota = new IOTA({
    'provider': process.env.IRI_URL
});
const options = {};   
const seed = process.env.CB_SEED;
iota.api.getNewAddress(seed, options, (error, address) => {
    
    if (error) {
        console.error(error);
        return;
    }
 
    console.log('Got address: ' + address);
 
    var transfer = [{
        address: address,
        value: 0,
        message: iota.utils.toTrytes('bingo from coding berlin!'),
        tag: 'CODIN9BERLIN' //iota.utils.toTrytes('codingberlin')
    }]
 
    // Depth for the tip selection
    var depth = 8;
    // If we're on the mainnet, minWeightMagnitude is 18
    var minWeightMagnitude = 18;
    // Call the sendTransfer API wrapper function
    // It takes care prepareTransfers, attachToTangle, broadcast and storeTransactions
    iota.api.sendTransfer( seed, depth, minWeightMagnitude, transfer, ( error, attached ) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("Successfully attached your transaction to the Tangle with transaction", attached);
    });
});
