<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	$: path = $page.route.id;
</script>

<header>
	<nav>
		<div>
			<strong>µform</strong>
			<em>microform</em>
		</div>
		<a href={`${base}/`} title="Home" class:active={path === '/'}>Home</a>
		<a href={`${base}/demo`} title="Microform Demo" class:active={path === '/demo'}
			>Microform Demo</a
		>
	</nav>
</header>
<main>
	<slot />
</main>

<style>
	header {
		background-color: #adbbc8;
		/* background-color: #b5bccb; */
	}
	nav {
		display: flex;
		align-items: center;
		padding: 0.5rem 3rem;
	}

	nav a {
		color: #142f49;
		text-decoration: none;
		transition: all 0.37s ease-in-out;
		font-weight: 600;
	}
	nav a.active,
	nav a:hover {
		text-decoration: underline;
	}
	nav a:first-of-type {
		margin-inline-start: auto;
	}
	nav a:last-of-type {
		margin-inline-start: 0.5rem;
	}

	nav div strong {
		font-size: 3em;
		font-weight: 700;
		color: #142f49;
	}
	nav div em {
		display: block;
		text-align: center;
		font-style: normal;
	}
	:global(body) {
		text-align: center;
		padding: 0;
		margin: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
	:global(pre) {
		padding: 1.5rem;
		margin-block: 1.5rem;
		margin-inline: 1rem;
		max-inline-size: 100%;
		border-radius: 8px;
		tab-size: 2;
		overflow-x: auto;
	}
	nav,
	main {
		margin-inline: auto;
		width: min(100%, 50em);
		text-align: left;
	}
	main {
		padding-block: 2rem;
	}
	:global(p),
	:global(li) {
		line-height: 1.65;
		font-size: 1rem;
	}
	:global(p > code),
	:global(li > code) {
		font-weight: 600;
		background-color: #cbd4dc;
		padding: 0.2rem 0.25rem;
		border-radius: 5px;
	}
	:global(h1),
	:global(h2),
	:global(h3) {
		margin-block-start: 4rem;
	}
</style>
