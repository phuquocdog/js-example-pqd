const { mnemonicGenerate,cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');

const { ApiPromise,WsProvider } = require('@polkadot/api');


async function generateAddress () {


	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});
	
	// Constuct the keyring after the API (crypto has an async init)
    const keyring = new Keyring({ type: 'sr25519' });
 //   keyring.setSS58Format(42);
 
   //const phrase = mnemonicGenerate(12);
    const phrase = "catalog away cool drum velvet collect vanish decorate potato picnic small marine";
    const {address} = keyring.addFromUri(phrase);

    
    console.log('Your phrase: ' + phrase);
    console.log('Your address: ' + address);

    

}

generateAddress().catch(console.error).finally(() => console.log('------Finish Demo getBalance ----'));
