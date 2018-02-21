require('dotenv').config();
var inquirer = require('inquirer');
var IOTA  = require('iota.lib.js');
var Mam = require('mam.client.js/lib/mam.node.js')

const iota = new IOTA({
    'provider': process.env.IRI_URL
});
Mam.init(iota)

const seed = process.env.CB_SEED;
const root = process.argv[2];

const logData = data => console.log(iota.utils.fromTrytes(data));

Mam.fetch(root, 'public', null, logData).then(resp => {
    console.dir(resp);
})
