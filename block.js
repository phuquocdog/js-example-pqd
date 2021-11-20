const { mnemonicGenerate,cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');

const { ApiPromise,WsProvider } = require('@polkadot/api');


async function generateBlock () {

	const provider = new WsProvider('wss://rpc.phuquoc.dog');
	const api = await ApiPromise.create({provider});
	
	// returns Hash
	const blockNumber = 1853
	const blockHash = await api.rpc.chain.getBlockHash(blockNumber);

	const signedBlock = await api.rpc.chain.getBlock(blockHash);

	console.log('blockHash: ' + blockHash);

	console.log('signedBlock: ' + signedBlock);


	const [
      { block },
      blockEvents,
      blockHeader,
      totalIssuance,
      runtimeVersion,
      activeEra,
      currentIndex,
      chainElectionStatus,
      timestampMs,
    ] = await Promise.all([
      api.rpc.chain.getBlock(blockHash),
      api.query.system.events.at(blockHash),
      api.derive.chain.getHeader(blockHash),
      api.query.balances.totalIssuance.at(blockHash),
      api.rpc.state.getRuntimeVersion(blockHash),
      api.query.staking.activeEra.at(blockHash)
        .then((res) => (res.toJSON() ? res.toJSON().index : 0)),
      api.query.session.currentIndex.at(blockHash)
        .then((res) => (res || 0)),
      api.query.electionProviderMultiPhase.currentPhase.at(blockHash),
      api.query.timestamp.now.at(blockHash),
    ]);

    console.log('blockEvents: ' + blockEvents);
    console.log('blockHeader: ' + blockHeader);
    console.log('totalIssuance: ' + totalIssuance);
    console.log('runtimeVersion: ' + runtimeVersion);

    const blockAuthor = blockHeader.author;
    const blockAuthorIdentity = await api.derive.accounts.info(blockHeader.author);


    console.log('blockAuthor: ' + blockAuthor);

    console.log('blockAuthorIdentity: ', blockAuthorIdentity);
}

generateBlock().catch(console.error).finally(() => console.log('------Finish Demo getBalance ----'));