require('dotenv').config();

const IOTA = require('iota.lib.js');
const iota = new IOTA({
    'provider': process.env.IRI_URL
});

iota.api.getNodeInfo( (error, success) => {
    if (error) {
        console.error(error);
    } else {
        console.dir(success);
    }
});

