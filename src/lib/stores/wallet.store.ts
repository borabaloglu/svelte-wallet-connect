import { createClient, configureChains, mainnet } from '@wagmi/core';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';

import { writable } from 'svelte/store';

const projectId = '';
const chains = [mainnet];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const client = createClient({
	autoConnect: true,
	connectors: w3mConnectors({
		projectId,
		version: 1,
		chains: chains
	}),
	provider
});

const ethereumClient = new EthereumClient(client, chains);

const web3modal = new Web3Modal(
	{
		projectId,
		themeVariables: {
			'--w3m-background-color': 'transparent',
			'--w3m-background-border-radius': '25px',
			'--w3m-container-border-radius': '25px'
		}
	},
	ethereumClient
);

const defaultValue = {
	client,
	ethereumClient,
	web3modal
};
const initialValue = defaultValue;

const wallet = writable<{
	client: typeof client;
	ethereumClient: EthereumClient;
	web3modal: Web3Modal;
}>(initialValue);

export default wallet;
