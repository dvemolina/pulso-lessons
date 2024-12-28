<script lang="ts">
	
</script>

<div class="avatar-element">
	<div class="avatar-grid">
		<div class="avatar-left">
			<div class="avatar-sports">
				<p>Ski, Snowboard</p>
			</div>
		</div>
		<div class="avatar-right">
			<div class="avatar-id">
				<img class="id-logo" src="/favicon.png" alt="" />
				<p class="id-number"></p>
			</div>
		</div>
	</div>
</div>

<style>
	.avatar-element {
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.avatar-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0.35rem;
		grid-template-areas: 'sports id';
	}

	.avatar-sports {
		grid-area: sports;
		display: flex;
		flex-direction: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		gap: 0.5rem;
		padding: 0.3rem;
		border-radius: 5px;
		background-color: rgba(255, 255, 255, 0.416);
		backdrop-filter: blur(20px);
	}

	.avatar-id {
		grid-area: id;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: fit-content;
		margin-left: auto;
		padding: 0.2rem;
		border-radius: 5px;
		background-color: rgba(255, 255, 255, 0.416);
		backdrop-filter: blur(20px);
		gap: 0.3rem;
	}
	.id-logo {
		max-width: 1rem;
	}
	.id-number {
		font-weight: 600;
		font-size: 0.9rem;
		color: black;
	}
</style>
