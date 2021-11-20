// Import the API, Keyring and some utility functions
const { ApiPromise,WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');


const BN = require('bn.js');

const ADDR = '5FUZZjdRkb7Z8YC7iTfPyNjtoc5zXvRw4kXqtpeVEituaRom';


async function getBalance () {

	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});
	// Retrieve the last timestamp
	const now = await api.query.timestamp.now();
	const { nonce, data: balance } = await api.query.system.account(ADDR);

	console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);
	console.log('balance for human: ' + balance.free.toHuman());
	console.log(balance);

}
//getBalance().catch(console.error).finally(() => console.log('------Finish Demo getBalance ----'));

async function transferBalance () {

	// Some mnemonic phrase
	const PHRASE = 'barrel outer about develop dignity nice slab lottery sort album knock salt';

	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});
	

	// Constuct the keyring after the API (crypto has an async init)
    const keyring = new Keyring({ type: 'sr25519' });

    // Add //Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
    const alice = keyring.addFromUri(PHRASE);

    const decims = new BN(api.registry.chainDecimals);
    const factor = new BN(1).pow(decims);
    const amount = new BN(1).mul(factor);

    // Create a extrinsic, transferring 12345 units to Bob
    const transfer = api.tx.balances.transfer(ADDR, amount);

    // Sign and send the transaction using our account
    const hash = await transfer.signAndSend(alice);

    console.log('Transfer sent with hash', hash.toHex());

}

//transferBalance().catch(console.error).finally(() => console.log('------Finish Demo getBalance ----'));


