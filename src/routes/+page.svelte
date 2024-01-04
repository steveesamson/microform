<script lang="ts">
	import uForm from '$lib/index.js';
	import type { Params } from '$lib/types.js';

	const { form, values, valid, errors, submit, onsubmit, reset } = uForm({
		data: {
			email: 'kevwe.samson@gmail.com',
			dob: '2023-02-06',
			supper_time: '13:35',
			favfoods: 'pando,jrice',
			beverage: 'coffee', //'coffee,milk'
			comment: 'I shall.',
			story: '<p>It is a story</p>',
			article: '<p>It is sure as heaven</p>',
			fullname: 'Steve Samson',
			password: 'GHST2444SNSGS'
		}
	});

	const save = (data: Params) => {
		console.log({ data });
	};

	const items: Params[] = [
		{ label: 'Coffee', value: 'coffee' },
		{ label: 'Tea', value: 'tea' },
		{ label: 'Milk', value: 'milk' }
	];

	const foods: Params[] = [
		{ label: 'Jollof rice', value: 'jrice' },
		{ label: 'Pando', value: 'pando' },
		{ label: 'Fried beans', value: 'fbeans' },
		{ label: 'Fried potatoes', value: 'fpotatoes' },
		{ label: 'Fried eggs', value: 'feggs' },
		{ label: 'Fried plantain', value: 'fplantain' }
	];
</script>

<form id="test-form">
	<h1>Welcome microform</h1>
	<p>Microform demo</p>

	<div>
		<label for="fullname">
			Name:
			<input type="text" name="fullname" id="fullname" use:form data-validations="required" />
			{#if $errors.fullname}
				<small>{$errors.fullname}</small>
			{/if}
		</label>
		<label for="dob">
			DOB:
			<input type="date" name="dob" id="supper_time" use:form data-validations="required" />
			{#if $errors.dob}
				<small>{$errors.dob}</small>
			{/if}
		</label>
		<label for="supper_time">
			Supper time:
			<input type="time" name="supper_time" id="supper_time" use:form data-validations="required" />
			{#if $errors.supper_time}
				<small>{$errors.supper_time}</small>
			{/if}
		</label>
		<label for="password">
			Password:
			<input type="password" name="password" id="password" use:form data-validations="required" />
			{#if $errors.password}
				<small>{$errors.password}</small>
			{/if}
		</label>
		<label for="gender">
			Gender:
			<select
				name="gender"
				id="gender"
				use:form={{ validateEvent: 'change' }}
				data-validations="required"
			>
				<option value="">Select gender</option>
				<option value="M">Male</option>
				<option value="F">Female</option>
			</select>
			{#if $errors.gender}
				<small>{$errors.gender}</small>
			{/if}
		</label>
		<label for="email">
			Email:
			<input type="text" name="email" id="email" use:form data-validations="required|email" />
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
		<label for="comment">
			Comment:
			<textarea name="comment" id="comment" use:form data-validations="required"></textarea>
			{#if $errors.comment}
				<small>{$errors.comment}</small>
			{/if}
		</label>
		<label for="beverage">
			Beverage:
			{#each items as item (item.value)}
				<span>
					<input
						type="radio"
						name="beverage"
						data-validations="required"
						value={item.value}
						use:form={{ validateEvent: 'change' }}
						bind:group={$values.beverage}
					/>
					{item.label}
				</span>
			{/each}
			{#if $errors.beverage}
				<small>{$errors.beverage}</small>
			{/if}
		</label>
		<label for="favfoods">
			Fav Foods:
			{#each foods as item (item.value)}
				<span>
					<input
						type="checkbox"
						name="favfoods"
						data-validations="required"
						value={item.value}
						use:form={{ validateEvent: 'change' }}
						bind:group={$values['favfoods']}
					/>
					{item.label}
				</span>
			{/each}
			{#if $errors.favfoods}
				<small>{$errors.favfoods}</small>
			{/if}
		</label>
		<label for="story">
			Story:
			<div
				contenteditable="true"
				use:form={{ validateEvent: 'input', validations: 'required', name: 'story', html: true }}
			/>
			{#if $errors.story}
				<small>{$errors.story}</small>
			{/if}
		</label>
		<section>
			<button type="button" class="button inverted primary">
				<span>Inverted</span>
			</button>
			<button type="button" disabled={!$valid} class="button primary" on:click={onsubmit(save)}>
				Submit
			</button>
			<!-- <button type="submit" disabled={!$valid}> Submit </button> -->
			<button type="button" on:click={reset} class="button danger inverted"> Danger </button>
		</section>
	</div>
</form>
<div class="spacer">&nbsp;</div>

<style>
	.spacer {
		margin: 1rem;
	}
	form {
		width: min(100%, 20em);
		margin-inline: auto;
		background-color: #efefef;
		border: 1px solid #ddd;
		padding: 1rem;
		border-radius: 0.5rem;
	}
	form > div {
		padding: 1.5rem;
	}
	small {
		color: tomato;
		font-size: 0.75rem;
	}
	label {
		display: grid;
		gap: 0.5rem;
		margin-block-end: 1rem;
	}
	h1,
	p {
		text-align: center;
	}

	input:not([type='radio'], [type='checkbox']),
	textarea,
	select,
	[contenteditable='true'] {
		padding: 0.5rem 1rem;
		outline: none;
		border: 1px solid #ddd;
		color: #333;
		background-color: #fff;
	}
</style>
