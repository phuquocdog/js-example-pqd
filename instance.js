const { mnemonicGenerate,cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');

const { ApiPromise,WsProvider } = require('@polkadot/api');


async function example () {

	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});

    console.log(api.genesisHash.toHex());

    console.log(api.runtimeMetadata);

}

example().catch(console.error).finally(() => console.log('------Finish Demo ----'));