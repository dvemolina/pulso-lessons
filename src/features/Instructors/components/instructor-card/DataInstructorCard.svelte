

<div class="data-element">
		<div class="data-grid">
			<div class="main-data">
				<p class="instructor-name">Marcos E</p>
				<div class="fares">
					<p>Desde:</p>
					<div class="pricing">
						<div class="price-time">
							<div class="price">375 <span class="currency">EUR</span></div>
							<div class="time">Día (6h)</div>
						</div>
						<div class="price-time">
							<div class="price">75 <span class="currency">EUR</span></div>
							<div class="time">Hora</div>
						</div>
					</div>
				</div>
			</div>
			<div class="secondary-data">
				<div class="score">
					<iconify-icon icon="uil:star"></iconify-icon>
					<p>5 / 5</p>
				</div>
				<div class="languages-flags">
					<iconify-icon icon="pixelarticons:message-text"></iconify-icon>
					<div class="flags">
						<iconify-icon icon="flagpack:gb-ukm"></iconify-icon>
						<iconify-icon icon="flagpack:es"></iconify-icon>
					</div>
				</div>
				<div class="qualification">
					<iconify-icon icon="pixelarticons:cellular-signal-0"></iconify-icon>
					<p>Nivel 3</p>
				</div>
				<div class="instructor-type">
					<iconify-icon icon="pixelarticons:home"></iconify-icon>
					<p>Escuela</p>
				</div>
			</div>
		</div>
</div>

<style>
	.data-element {
		height: 100%;
		width: 100%;
	}

	.data-grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		grid-template-areas: 'main secondary';
		height: 100%;
	}

	.main-data {
		grid-area: main;
		display: flex;
		flex-direction: column;
		padding: 0.7rem;
		height: 100%;
	}

	.instructor-name {
		font-size: 1.35rem;
		font-weight: 600;
		font-family: var(--poppins);
		padding-left: 0.3rem;
	}

	.fares {
		display: flex;
		flex-direction: column;
		padding-left: 0.5rem;
		margin-top: auto;
	}
	.pricing {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.fares p {
		color: var(--neutral-light-inactive);
		font-size: 1rem;
	}

	.price-time {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(213, 213, 213, 0.14);
		border-radius: 7px;
		color: rgba(255, 255, 255, 0.634);
		font-size: 1.3rem;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		width: 100%;
	}

	.price {
		color: var(--neutral-light)
	}

	.price,
	.time {
		padding: 0.1rem;
	}
	.time {
		border-top: 1px solid rgba(213, 213, 213, 0.14);
		color: var(--neutral-light-inactive);
		font-size: 0.8rem;
		width: 100%;
		text-align: center;
	}

	.currency {
		font-size: 0.7rem;
		color: var(--neutral-light-inactive);
	}

	.secondary-data {
		grid-area: secondary;
		display: flex;
		flex-direction: column;
		padding: 0.7rem;
		gap: 0.5rem;
		color: var(--neutral-light-inactive);
		margin-top: auto;
	}

	.languages-flags,
	.qualification,
	.score,
	.instructor-type {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.3rem;
		border: 1px solid rgba(213, 213, 213, 0.14);
		padding: 0.1rem 0.3rem;
		border-radius: 7px;
	}
	.score {
		background-color: rgba(246, 255, 0, 0.077);
		color: rgba(255, 255, 255, 0.729);
	}

	.flags {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		width: 100%;
		opacity: 0.7;
	}

	.qualification p,
	.score p,
	.instructor-type p {
		font-size: 0.8rem;
		padding: 0;
		margin: 0;
	}

</style>
