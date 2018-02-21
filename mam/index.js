require('dotenv').config();
var inquirer = require('inquirer');
var IOTA  = require('iota.lib.js');
var Mam = require('mam.client.js/lib/mam.node.js')

const iota = new IOTA({
    'provider': process.env.IRI_URL
});
const seed = process.env.CB_SEED;
// Initialise MAM State - PUBLIC
let mamState = Mam.init(iota, seed)

function promptMessage() {
    return inquirer.prompt([{type: 'input', name:'message', message: 'message' }]);
}

function publish(message) {
    let payload = iota.utils.toTrytes(message);
    let mamMessage = Mam.create(mamState, payload);   // Create MAM Payload - STRING OF TRYTES
        //console.log(message)
        mamState = mamMessage.state // Save new mamState
        
        console.log('Root: ', mamMessage.root)
        console.log('Address: ', mamMessage.address)
        
        return Mam.attach(mamMessage.payload, mamMessage.address)
        
        // Fetch Stream Async to Test
        //var resp = await Mam.fetch(message.root, 'public', null, console.log)
        //console.log(resp)
}

(async () => {

  while(1) {
    let result = await promptMessage(); 
    
    let transactions = await publish(result.message);
    console.dir(transactions);
  }
})();
 
