<script lang="ts">
  import "./css/tailwind.pcss";

  import { slide } from "svelte/transition";

  import CheckForUpdate from "./Components/Default/CheckForUpdate.svelte";
  import InfoApp from "./Components/Default/InfoApp.svelte";
  import MainWithTitlebar from "./Components/Default/MainWithTitlebar.svelte";

  import Card from "./Components/Cards/Card.svelte";

  let showInfo = false;

  const hash = globalThis.location.hash.substring(1);

  function openInNewWindow(e) {
    globalThis.api.windowManager.send("openInNewWindow", e.detail);
  }

  // to do: change title page

  const listCards = [
    {
      title: "Svelte",
      link: "https://svelte.dev/",
      description: "How to build Svelte apps",
    },
    {
      title: "Repository",
      link: "https://github.com/el3um4s/memento-electron-browser-view",
      description: "View the source code",
    },
    {
      title: "Electron",
      link: "https://www.electronjs.org/",
      description:
        "Build cross-platform desktop apps with JavaScript, HTML, and CSS",
    },
    {
      title: "Tailwind CSS",
      link: "https://tailwindcss.com/docs/installation",
      description: "Get started with Tailwind CSS",
    },
  ];
</script>

<svelte:head>
  <title>MEMENTO - Electron Browser View</title>
</svelte:head>

<MainWithTitlebar title="MEMENTO - Electron Browser View">
  {#if hash === "main"}
    <section class="space-y-6">
      <div class="list-cards">
        {#each listCards as card (card.link)}
          <Card
            title={card.title}
            link={card.link}
            on:open-in-new-window={openInNewWindow}
          >
            <div slot="description">{card.description}</div>
          </Card>
        {/each}
      </div>

      <div>
        <button on:click={() => (showInfo = !showInfo)}
          >{showInfo ? "Hide Info" : "Show Info"}</button
        >
        {#if showInfo}
          <div transition:slide>
            <InfoApp />
          </div>
        {/if}
        <CheckForUpdate />
      </div>
    </section>
  {/if}
</MainWithTitlebar>

<style>
  .list-cards {
    display: grid;
    gap: 1rem;
    align-items: flex-start;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  button {
    @apply py-2 px-4 font-semibold rounded-lg border;
  }

  button:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }
</style>
