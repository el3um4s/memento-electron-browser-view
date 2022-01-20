<script lang="ts">
  import "./css/tailwind.pcss";
  import CheckForUpdate from "./Components/Default/CheckForUpdate.svelte";
  import InfoApp from "./Components/Default/InfoApp.svelte";
  import MainWithTitlebar from "./Components/Default/MainWithTitlebar.svelte";

  import Card from "./Components/Cards/Card.svelte";

  const hash = globalThis.location.hash.substring(1);

  function openInNewWindow(e) {
    globalThis.api.windowManager.send("openInNewWindow", e.detail);
  }

  // to do: change title page
</script>

<svelte:head>
  <title>MEMENTO - Electron Browser View</title>
</svelte:head>

<MainWithTitlebar title="MEMENTO - Electron Browser View">
  {#if hash === "main"}
    <section class="space-y-6">
      <Card
        title="Svelte tutorial"
        link="https://svelte.dev/tutorial"
        on:open-in-new-window={openInNewWindow}
      >
        <div slot="description">How to build Svelte apps</div>
      </Card>

      <Card
        title="Repository"
        link="https://github.com/el3um4s/memento-electron-browser-view"
        on:open-in-new-window={openInNewWindow}
      >
        <div slot="description">View the source code</div>
      </Card>

      <InfoApp />
      <CheckForUpdate />
    </section>
  {/if}
</MainWithTitlebar>

<style lang="postcss">
</style>
