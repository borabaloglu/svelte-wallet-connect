<script lang="ts">
	import wallet from '$lib/stores/wallet.store';

	const web3modal = $wallet.web3modal;
</script>

<div>
	<button on:click={() => web3modal.openModal()}>Connect Wallet</button>
</div>
