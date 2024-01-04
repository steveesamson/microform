<svelte:head>

<title>Microform Home</title>
<meta property="og:type" content="microform home" />
<meta property="og:title" content="Microform home" />
</svelte:head>

# microform

`microform` is a tiny library for managing forms in `svelte/sveltekit`.

## Installation

```bash
# In your project directory
npm install @steveesamson/microform
```

or

```bash
# In your project directory
yarn add @steveesamson/microform
```

## Usage

Once you've added `microform` to your project, use it as shown below, in your view(`.svelte` files):

## In the view `script`

```ts
<script>
import uForm from "@steveesamson/microform";
// default form data, probably passed as props
export let defaultData:any = {};

// Instatiate microform
const { form, values, errors, submit, valid } = uForm({
    // Set default form data
    data:{...defaultData},
    // Set a global event for validation, can be overriden on a each field.
    // Possible values: blur, change, input, keyup
    validateEvent:'blur'
});

// Submit handler
// data is the collected form data
// Only called on valid form
// A form is valid when it has no error and at least one of the fields has changed
const onSubmit = (data:unknown) => {
    console.log(data);
}
</script>
```

On the instantiation of `microform`, we have access to:

- `values`, a `FormValues`, which is a `svelte store` for form data.
- `errors`, a `FormErrors`, which is a `svelte store` for form errors.
- `form`, which is a `svelte action` that actually does the `microform` magic.
- `submit`, which is another `svelte action` to handle form submission.
- `valid`, a `FormSanity`, which is a `svelte store` that tells if a form is clean/without errors.
- `reset`, a function to reset form
- `onsubmit`, a function to handle form submission.

## In the view `html`

```html
    <form use:submit={onSubmit}>
        <label for='username'>
            Username:
            <input
            type='text'
            name='username'
            id='username'
            use:form
            data-validations='required'>
            {#if $errors.username}
            <small>{$errors.username}</small>
            {/if}
        </label>
         <label for='email_account'>
            Email Account:
            <input
            type='text'
            name='email_account'
            id='email_account'
            use:form={{
                validations:'required|email'
            }}/>
            {#if $errors.email_account}
            <small>{$errors.email_account}</small>
            {/if}
        </label>
        <label for='gender'>
            Gender:
            <select
            name='gender'
            id='gender'
            use:form={{
                validations:'required',
                validateEvent:'change'
            }}>
                <options value=''>Gender please</option>
                <options value='F'>Female</option>
                <options value='M'>Male</option>
                </select>
            {#if $errors.gender}
            <small>{$errors.gender}</small>
            {/if}
        </label>
        <label for='password'>
            Password:
            <input
            type='text'
            name='password'
            id='password'
            use:form
            data-validations='required'>
            {#if $errors.password}
            <small>{$errors.password}</small>
            {/if}
        </label>
         <label for='confirm_password'>
            Confirm password:
            <input
            type='text'
            name='confirm_password'
            id='confirm_password'
            use:form
            data-validations='required|match:password'>
            {#if $errors.confirm_password}
            <small>{$errors.confirm_password}</small>
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
                    html: true
                }}
            />
            {#if $errors.story}
                <small>{$errors.story}</small>
            {/if}
        </label>

        <button
        type='submit'
        disabled={!$valid}>
            Submit form
        </button>
    </form>
```

While the above example uses the `submit` action of `microform`, form could also be submitted by using the `onsubmit` function of `microform`. See the following:

```html
<form>
	<label for="password">
		Password:
		<input
			type="text"
			name="password"
			id="password"
			data-validations="required|min-length:6"
			use:form
		/>
		{#if $errors.password}
		<small>{$errors.password}</small>
		{/if}
	</label>
	<label for="confirm_password">
		Confirm password:
		<input
			type="text"
			name="confirm_password"
			id="confirm_password"
			use:form
			data-validations="required|match:password"
		/>
		{#if $errors.confirm_password}
		<small>{$errors.confirm_password}</small>
		{/if}
	</label>

	<button type="button" disabled="{!$valid}" on:click="{onsubmit(onSubmit)}">Submit form</button>
</form>
```

## Features

`microform` performs its magic by relying the `form` action. The `form` action can optionally accept the following:

```javascript
<input
	use:form={{
		// an optional list of validations
		// default is '' - no validations
		validations: 'email|length:20',
		// an optional string of
		// any of blur, change, input, keyup.
		// default is blur
		validateEvent: 'input',
		// an optional string that allows passing field names
		// especially useful for contenteditables
		// that have no native name attribute
		// default is ''
		name: '',
		// an optional boolean indicating
		// whether content should be treated as plain text or html
		// also useful for contenteditables
		// default is false
		html: true
	}}
/>
```

You need not bind the `values` to your fields except when there is a definite need for it as `form` will coordinate all value changes based on the `data` passed at instantiation, if any. Therefore, constructs like the following might not be neccessary:

```html
<input
	type="text"
	name="email_account"
	id="email_account"
	value="{$values.email_account}"
	data-validations="required|email"
	use:form
/>
```

## 1. Validations

Uses both inline `data-validations` on field and `validations` props on `form` action. For instance, the following are perfectly identical:

```html
<input
    type='text'
    name='email_account'
    id='email_account'
    data-validations='required|email'
    use:form/>

<input
    type='text'
    name='email_account'
    id='email_account'
    use:form={{
        validations:'required|email'
    }}/>
```

## 2. Validation Event

Validation event can be changed/specified on a per-field basis. For instance, in our example, the global `validateEvent` was set to `blur` but we changed it on the select field to `change` like so:

```html
<select
    name='gender'
    id='gender'
    use:form={{
        validations:'required',
        validateEvent:'change'
    }}>
        <options value=''>Gender please</option>
        <options value='F'>Female</option>
        <options value='M'>Male</option>
</select>
```

## 3. Supports for contenteditable

`microform` supports `contenteditable` out-of-box:

```html
<form use:submit={onSubmit}>
    <label for="story">
	Story:
        <div
            contenteditable="true"
            use:form={{
                validateEvent: 'input',
                validations: 'required',
                name: 'story',
                html: true
            }}
        />
        {#if $errors.story}
            <small>{$errors.story}</small>
        {/if}
    </label>
</form>
```

## 4. Default validations

`microform` provides a set of usable validations out-of-box. The following is a list of provided validations:

- `required`: Usage, `validations='required'`
- `email`: Usage, `validations='email'`
- `url`: Usage, `validations='url'`
- `ip`: Usage, `validations='ip'`
- `length`: Usage, `validations='length:40'`
- `number`: Usage, `validations='number'`
- `integer`: Usage, `validations='integer'`
- `alpha`: Usage, `validations='alpha'` - only alphabets
- `alphanum`: Usage, `validations='alphanum'` - alphanumeric
- `match`: Usage, `validations='match:<name-of-field-to-match>'`. For instance, this is examplified in our example with `password` and `confirm_password` fields
- `min-length`: Usage, `validations='min-length:6'`
- `max-length`: Usage, `validations='max-length:15'`
- `max`: Usage, `validations='max:25'`
- `max-file-size-mb`: Usage, `validations='max-file-size-mb:30'` - for file upload

Every validation listed above also comes with a very good default error message.

## 5. Combining validation rules

Finally, validations can be combined to form a complex graph of validations based on use cases by separating each validation rule with a `pipe`, `|`. For instance, a required field that also should be an email field could be validated thus:

```html
<input
	type="text"
	name="email_account"
	id="email_account"
	data-validations="required|email"
	use:form
/>
```

# TODO

I shall be working on how to allow users register their `validators` and `error messages` for the purpose of customisation.
