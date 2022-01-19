<script lang="ts">
  import "./css/tailwind.pcss";
  import CheckForUpdate from "./Components/Default/CheckForUpdate.svelte";
  import InfoApp from "./Components/Default/InfoApp.svelte";
  import MainWithTitlebar from "./Components/Default/MainWithTitlebar.svelte";

  import Card from "./Components/Cards/Card.svelte";

  let chrome, node, electron;
  globalThis.api.systemInfo.receive("getSystemInfo", (data) => {
    chrome = data.chrome;
    node = data.node;
    electron = data.electron;
    console.log(node, chrome, electron);
  });

  function openInNewWindow(e) {
    console.log(e.detail);
    globalThis.api.systemInfo.send("requestSystemInfo", null);
    globalThis.api.windowManager.send("openInNewWindow", e.detail);
  }
</script>

<svelte:head>
  <title>MEMENTO - Svelte, TailwindCSS, Electron and TypeScript</title>
</svelte:head>

<MainWithTitlebar title="MEMENTO - Electron Browser View">
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
</MainWithTitlebar>

<style lang="postcss">
</style>
