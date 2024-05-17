<script>
	import Form from './demoform.svelte';
</script>

<svelte:head>

<title>Microform Demo</title>
<meta property="og:type" content="microform demo" />
<meta property="og:title" content="Microform demo" />
</svelte:head>

<Form />

## Source code for demo form

### script

```ts
<script>
	import uForm from "@steveesamson/microform";

	const { form, values, sanity, errors, submit, onsubmit, reset } = uForm({
		data: {
			email: 'stevee.samson@gmail.com',
			dob: '2023-02-06',
			supper_time: '13:35',
			favfoods: 'pando,jrice',
			beverage: 'coffee', //'coffee,milk'
			comment: 'I shall.',
			story: '<p>It is a story</p>',
			fullname: 'Steve Samson',
			password: 'some-top-dark-secret'
		}
	});

	const save = (data: unknown) => {
		console.log({ data });
		alert(JSON.stringify(data, null, 2));
	};

	const items: any[] = [
		{ label: 'Coffee', value: 'coffee' },
		{ label: 'Tea', value: 'tea' },
		{ label: 'Milk', value: 'milk' }
	];

	const foods: any[] = [
		{ label: 'Jollof rice', value: 'jrice' },
		{ label: 'Pando', value: 'pando' },
		{ label: 'Fried beans', value: 'fbeans' },
		{ label: 'Fried potatoes', value: 'fpotatoes' },
		{ label: 'Fried eggs', value: 'feggs' },
		{ label: 'Fried plantain', value: 'fplantain' }
	];
</script>
```

### html

```html
<form id="test-form" use:submit={save}>
	<h1>Microform demo</h1>

	<div>
		<label for="fullname">
			Name:
			<input type="text" name="fullname" id="fullname" use:form data-validations="required" />
			{#if errors.fullname}
				<small>{errors.fullname}</small>
			{/if}
		</label>
		<label for="dob">
			DOB:
			<input type="date" name="dob" id="supper_time" use:form data-validations="required" />
			{#if errors.dob}
				<small>{errors.dob}</small>
			{/if}
		</label>
		<label for="supper_time">
			Supper time:
			<input type="time" name="supper_time" id="supper_time" use:form data-validations="required" />
			{#if errors.supper_time}
				<small>{errors.supper_time}</small>
			{/if}
		</label>
		<label for="password">
			Password:
			<input type="password" name="password" id="password" use:form data-validations="required" />
			{#if errors.password}
				<small>{errors.password}</small>
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
			{#if errors.gender}
				<small>{errors.gender}</small>
			{/if}
		</label>
		<label for="email">
			Email:
			<input type="text" name="email" id="email" use:form data-validations="required|email" />
			{#if errors.email}
				<small>{errors.email}</small>
			{/if}
		</label>
		<label for="comment">
			Comment:
			<textarea name="comment" id="comment" use:form data-validations="required"></textarea>
			{#if errors.comment}
				<small>{errors.comment}</small>
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
						bind:group={values.beverage}
					/>
					{item.label}
				</span>
			{/each}
			{#if errors.beverage}
				<small>{errors.beverage}</small>
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
						bind:group={values['favfoods']}
					/>
					{item.label}
				</span>
			{/each}
			{#if errors.favfoods}
				<small>{errors.favfoods}</small>
			{/if}
		</label>
		<label for="story">
			Story:
			<div
				contenteditable="true"
				use:form={{
					validateEvent: 'input',
					validations: 'required',
					name: 'story',
					html: true }}
			></div>
			{#if errors.story}
				<small>{errors.story}</small>
			{/if}
		</label>
		<section>
			<button type="submit" disabled={!sanity.ok}> Submit </button>
			<button type="button" onclick={reset}> Reset </button>
		</section>
	</div>
</form>
```
