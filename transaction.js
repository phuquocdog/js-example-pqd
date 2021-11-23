// Import the API, Keyring and some utility functions
const { ApiPromise,WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');


const BN = require('bn.js');

const ADDR = '5FUZZjdRkb7Z8YC7iTfPyNjtoc5zXvRw4kXqtpeVEituaRom';


async function transferBalance (amount) {

	// Some mnemonic phrase
	const PHRASE = 'barrel outer about develop dignity nice slab lottery sort album knock salt';

	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});
	

	// Constuct the keyring after the API (crypto has an async init)
    const keyring = new Keyring({ type: 'sr25519' });

    // Add //Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
    const alice = keyring.addFromUri(PHRASE);

    const decims = new BN(api.registry.chainDecimals);
    const factor = new BN(10).pow(decims);
    const amountUnit = new BN(amount).mul(factor);

    //console.log(amountUnit)

    // Create a extrinsic, transferring 12345 units to Bob
    const transfer = api.tx.balances.transfer(ADDR, amountUnit);

    // Sign and send the transaction using our account
    //const hash = await transfer.signAndSend(alice);
    const hash = await transfer.signAndSend(alice, { nonce: -1 });

    console.log('Transfer sent with hash', hash.toHex());



}

transferBalance(20).catch(console.error).finally(() => console.log('------Finish Demo getBalance ----'));


