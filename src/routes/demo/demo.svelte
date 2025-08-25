<script lang="ts">
	import uform from '$lib/index.js';
	import type { Params } from '$lib/internal.svelte.js';
	import Form from './form.svelte';

	let { form, values, sanity, errors, submit, reset } = uform({
		data: {
			email: 'vee.sam@gmail.com',
			dob: '2023-02-06',
			supper_time: '13:35',
			favfoods: ['pando', 'jrice'],
			beverage: 'coffee', //'coffee,milk'
			comment: 'I shall.',
			story: '<p>It is a story</p>',
			fullname: 'Steve Samson',
			password: 'some-top-dark-secret'
		},
		options: {
			validateEvent: 'input',
			debug: true
		}
	});

	const save = (data: Params) => {
		alert(JSON.stringify(data, null, 2));
	};
</script>

<Form bind:values bind:errors {...{ form, sanity, submit, reset, onsubmit: save }} />
