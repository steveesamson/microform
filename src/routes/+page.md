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

### In the view Script

```ts
<script>
import uform from "@steveesamson/microform";
// default form data, probably passed as props
let defaultData:any = $props();

// Instatiate microform
const { form, values, errors, submit, sanity } = uform({
    // Set default form data
    data:{...defaultData},
    // Set a global event for validation, can be overriden on a each field.
    // Possible values: blur, change, input, keyup
    options:{
        // Default event that triggers validation
        validateEvent:'blur',
        // Configure validators here
        validators:{}
    }
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

- `values`, a `FormValues`, which represents form data.
- `errors`, a `FormErrors`, which represents form errors.
- `form`, which is a `svelte action` that actually does the `microform` magic.
- `submit`, which is another `svelte action` to handle form submission.
- `sanity`, a `FormSanity`, which tells us if a form is clean/without errors by it's `ok` property.
- `reset`, a function to reset form
- `onsubmit`, a function to handle form submission.

### In the view Html

```html
    <form use:submit={onSubmit}>
        <label for="fullname">
			Name:
			<input
			type="text"
			name="fullname"
			id="fullname"
			use:form={{ validations: ['required'] }}
			/>
			{#if errors.fullname}
				<small>{errors.fullname}</small>
			{/if}
		</label>
		<label for="dob">
			DOB:
			<input
			type="date"
			name="dob"
			id="dob"
			use:form={{ validations: ['required'] }}
			/>
			{#if errors.dob}
				<small>{errors.dob}</small>
			{/if}
		</label>
		<label for="supper_time">
			Supper time:
			<input
				type="time"
				name="supper_time"
				id="supper_time"
				use:form={{ validations: ['required'] }}
			/>
			{#if errors.supper_time}
				<small>{errors.supper_time}</small>
			{/if}
		</label>
		<label for="password">
			Password:
			<input
				type="password"
				name="password"
				id="password"
				use:form={{ validations: ['required'] }}
			/>
			{#if errors.password}
				<small>{errors.password}</small>
			{/if}
		</label>
		<label for="gender">
			Gender:
			<select
				name="gender"
				id="gender"
				use:form={{ validateEvent: 'change', validations: ['required'] }}
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
			<input
				type="text"
				name="email"
				id="email"
				use:form={{ validations: ['required', 'email'] }}
			/>
			{#if errors.email}
				<small>{errors.email}</small>
			{/if}
		</label>
        <label for="resume">
			Resume:
			<input
				type="file"
				name="resume"
				id="resume"
				use:form={{
					validateEvent:'change',
					validations: ['required', 'file-size-mb:3']
				}}
			/>
			{#if errors.resume}
				<small>{errors.resume}</small>
			{/if}
		</label>
		<label for="comment">
			Comment:
			<textarea
			name="comment"
			id="comment"
			use:form={{ validations: ['required'] }}
			></textarea>
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
						value={item.value}
						use:form={{ validateEvent: 'input', validations: ['required'] }}
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
						value={item.value}
						use:form={{ validateEvent: 'change', validations: ['required'] }}
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
					validations: ['required'],
					name: 'story',
					html: true
				}}
			></div>
			{#if errors.story}
				<small>{errors.story}</small>
			{/if}
		</label>

        <button
        type='submit'
        disabled={!sanity.ok}>
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
            use:form={{
				validations: ['required']
            }}
        />
		{#if errors.password}
		<small>{errors.password}</small>
		{/if}
	</label>
	<label for="confirm_password">
		Confirm password:
		<input
			type="text"
			name="confirm_password"
			id="confirm_password"
			use:form={{
				validations: ['required','match:password'],
            }}
		/>
		{#if errors.confirm_password}
		<small>{errors.confirm_password}</small>
		{/if}
	</label>

	<button type="button" disabled="{!sanity.ok}" onclick="{onsubmit(onSubmit)}">Submit form</button>
</form>
```

## microform Features

`microform` performs its magic by relying the `form` action. The `form` action can optionally accept the following:

```ts
<input
	use:form={{
		// an optional list of validations
		// default is '' - no validations
		validations: ['email', 'len:20'],
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
<input ... value="{values.email_account}" />
```

### 1. Validations

`validations` is an array of validations to check field values against for correctnes. Uses `validations` props on `form` action. For instance, the following:

```html
<input
    type='text'
    name='email_account'
    id='email_account'
    use:form={{
        validations:[ 'required', 'email' ]
    }}
/>
```

### 2. Validation Event

Validation event is to configure the event that should trigger validations. It can be changed/specified on a per-field basis. For instance, in our example, the global `validateEvent` was set to `blur` but we changed it on the select field to `change` like so:

```html
<select
    name='gender'
    id='gender'
    use:form={{
        validations:['required'],
        validateEvent:'change'
    }}>
        <options value=''>Gender please</option>
        <options value='F'>Female</option>
        <options value='M'>Male</option>
</select>
```

### 3. Supports for contenteditable

`microform` supports `contenteditable` out-of-box:

```html
<form use:submit={onSubmit}>
    <label for="story">
	Story:
        <div
            contenteditable="true"
            use:form={{
                validateEvent: 'input',
                validations: ['required'],
                name: 'story',
                html: true
            }}
        ></div>
        {#if errors.story}
            <small>{errors.story}</small>
        {/if}
    </label>
</form>
```

### 4. Provides usable default validations

`microform` provides a set of usable validations out-of-box. The following is a list of provided validations:

- `required`: Usage, `validations:['required']`
- `email`: Usage, `validations:['email']`
- `url`: Usage, `validations:['url']`
- `ip`: Usage, `validations:['ip']`
- `len:<number>`: Usage, `validations:['len:40']`
- `number`: Usage, `validations:['number']`
- `integer`: Usage, `validations:['integer']`
- `alpha`: Usage, `validations:['alpha']` - only alphabets
- `alphanum`: Usage, `validations:['alphanum']` - alphanumeric
- `match:<input-id>`: Usage, `validations:['match:<id-of-field-to-match>']`. For instance, this is examplified in our example with `password` and `confirm_password` fields
- `minlen:<number>`: Usage, `validations:['minlen:6']`
- `maxlen:<number>`: Usage, `validations:['maxlen:15']`
- `max:<number>`: Usage, `validations:['max:25']`
- `file-size-mb:<number>`: Usage, `validations:['file-size-mb:30']` - for file upload

Every validation listed above also comes with a very good default error message.

Finally, the validations can be combined to form a complex graph of validations based on use cases by combining them in a single array of validations. For instance, a required field that also should be an email field could be configured thus:

```html
<input
	type="text"
	name="email_account"
	id="email_account"
    use:form={{
        validations:['required','email']
    }}
/>
```

# Overriding validators

Validators could be overriden to provide custom validation and/or messages besides the default ones. For instance, let us overide the `len` validation rule. Every non-empty string/message returned from a validator's call becomes the error to be displayed to the user; and it shows up in the `errors` keyed by the field name.

### Approach 1

```ts
<script>
import uform, { type FieldProps } from "@steveesamson/microform";
// default form data, probably passed as props
export let defaultData:any = {};

// Instatiate microform
const { form, values, errors, submit, sanity } = uform({
    // Set default form data
    data:{...defaultData},
    // Set a global event for validation, can be overriden on a each field.
    // Possible values: blur, change, input, keyup
    options:{
        // Default event that triggers validation
        validateEvent:'blur',
        // Configure validators here
        validators:{
            len:({name, label, parts}:FieldProps) =>{
                if (!parts || parts.length < 2) {
                    return `${label}: length validation requires length.`;
                }
                const extra = parts[1].trim();
                return !!value && value.length !== parseInt(parts[1], 10) ?  `${label} must exactly be ${extra} characters long.` : "";
            }
        }
    }
});
</script>
```

Instead of using the literal validation keys like `len`, `required` etc., while overriding validators, the exported key namee could be used. The key names are:

- IS_REQUIRED = `required`
- IS_EMAIL = `email`
- IS_URL = `url`
- IS_IP = `ip`
- IS_INTEGER = `integer`
- IS_NUMBER = `number`
- IS_ALPHA = `alpha`
- IS_ALPHANUM = `alphanum`
- IS_MIN_LEN = `minlen`
- IS_MAX_LEN = `maxlen`
- IS_LEN = `len`
- IS_MIN = `min`
- IS_MAX = `max`
- IT_MATCHES = `match`
- IS_FILE_SIZE_MB = `file-size-mb`

Therefore, the following is equivalent to the configuration in `Approach 1`:

### Approach 2

```ts
<script>
import uform, { type FieldProps, IS_LEN } from "@steveesamson/microform";
// default form data, probably passed as props
export let defaultData:any = {};

// Instatiate microform
const { form, values, errors, submit, sanity } = uform({
    // Set default form data
    data:{...defaultData},
    // Set a global event for validation, can be overriden on a each field.
    // Possible values: blur, change, input, keyup
    options:{
        // Default event that triggers validation
        validateEvent:'blur',
        // Configure validators here
        validators:{
            [IS_LEN]:({name, label, parts}:FieldProps) =>{
                if (!parts || parts.length < 2) {
                    return `${label}: length validation requires length.`;
                }
                const extra = parts[1].trim();
                return !!value && value.length !== parseInt(parts[1], 10) ?  `${label} must exactly be ${extra} characters long.` : "";
            }
        }
    }
});
</script>
```

The validation will be used on the view as below:

```html
<input
	type="text"
	name="comment"
	id="comment"
    use:form={{
        validations:['required','len:30']
    }}
/>
```
