<script lang="ts">
  export let link: string;
  export let title: string;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  $: detail = {
    title,
    link,
  };

  function openInNewWindow() {
    dispatch("open-in-new-window", detail);
  }
</script>

<div class="card">
  <div class="header">
    <div class="title">
      {title}
    </div>
  </div>
  <div class="content">
    <slot name="description" />
  </div>
  <div class="footer">
    <button title={link} on:click={openInNewWindow}>
      Open in new window
    </button>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply max-w-xs rounded shadow-neutral-50/40 overflow-hidden;
    background-color: theme("colors.neutral.50");
    color: theme("colors.cyan.800");
  }

  .card:hover {
    @apply shadow-md shadow-neutral-50;
  }

  .header {
    @apply px-2 bg-neutral-100;
    border-bottom: 1px solid theme("colors.neutral.200");
  }

  .title {
    @apply font-bold text-lg mb-2;
  }

  .content {
    @apply px-3 py-2;
  }

  .footer {
    @apply px-2 py-1 text-right bg-neutral-100;
    border-top: 1px solid theme("colors.neutral.200");
  }
</style>
