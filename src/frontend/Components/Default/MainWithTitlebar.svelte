<script lang="ts">
  import { TitleBar } from "@el3um4s/svelte-titlebar";
  export let title: string = "Title";

  let outerW = globalThis.outerWidth - 8;
  let isMaximized = outerW >= globalThis.screen.availWidth;

  $: {
    isMaximized = outerW >= globalThis.screen.availWidth;
  }

  function minimize() {
    globalThis.api.windowControls.send("minimize", null);
  }
  function maximize() {
    globalThis.api.windowControls.send("maximize", null);
  }
  function close() {
    globalThis.api.windowControls.send("close", null);
  }
  function unmaximize() {
    globalThis.api.windowControls.send("unmaximize", null);
  }
</script>

<svelte:window bind:outerWidth={outerW} />

<main>
  <div class="titlebar">
    <TitleBar
      {title}
      {isMaximized}
      on:clickMinimize={minimize}
      on:clickUnmaximize={unmaximize}
      on:clickMaximize={maximize}
      on:clickClose={close}
    />
  </div>
  <div class="page">
    <slot />
  </div>
</main>

<style lang="postcss">
  .titlebar {
    --background-color: theme("colors.cyan.900");
    --text-color: theme("colors.neutral.50");
  }
  main {
    @apply w-full;
  }
  .page {
    @apply p-5 overflow-y-auto w-full border border-cyan-900;
    height: calc(100% - theme("spacing.8"));
  }

  .page::-webkit-scrollbar {
    @apply w-4;
  }

  .page::-webkit-scrollbar-track {
    background-color: theme("colors.cyan.900");

    border: 2px solid theme("colors.cyan.900");
    border-left: 8px solid theme("colors.cyan.800");
  }

  .page::-webkit-scrollbar-thumb {
    background-color: theme("colors.cyan.700");
    border-left: 8px solid theme("colors.cyan.800");
  }

  .page::-webkit-scrollbar-track:hover {
    border: 2px solid theme("colors.cyan.900");
  }

  .page::-webkit-scrollbar-thumb:hover {
    background-color: theme("colors.cyan.600");
    border: 0;
  }
</style>
