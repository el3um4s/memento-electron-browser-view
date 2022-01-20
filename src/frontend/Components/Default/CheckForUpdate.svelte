<script lang="ts">
  let version: string = "-";

  let checkingForUpdate: boolean = false;
  let updateAvailable: boolean = false;
  let updateNotAvailable: boolean = false;
  let downloading: boolean = false;
  let quitAndInstall: boolean = false;
  let isInstalling: boolean = false;

  let downloadMessage: string = "";

  globalThis.api.updaterInfo.send("requestVersionNumber", null);

  globalThis.api.updaterInfo.receive("getVersionNumber", (data) => {
    version = data.version;
  });

  function check() {
    checkingForUpdate = true;
    globalThis.api.updaterInfo.send("checkForUpdate", { version });
  }

  globalThis.api.updaterInfo.receive("checkingForUpdate", (data) => {
    checkingForUpdate = true;
  });

  globalThis.api.updaterInfo.receive("updateAvailable", (data) => {
    checkingForUpdate = false;
    updateAvailable = true;
  });

  globalThis.api.updaterInfo.receive("updateNotAvailable", (data) => {
    checkingForUpdate = false;
    updateAvailable = false;
    updateNotAvailable = true;
  });

  function startDownloadUpdate() {
    globalThis.api.updaterInfo.send("startDownloadUpdate", null);
    updateAvailable = false;
    downloading = true;
  }

  globalThis.api.updaterInfo.receive("downloadProgress", (data) => {
    downloading = true;
    updateAvailable = false;
    let log_message = "Download speed: " + data.bytesPerSecond;
    log_message =
      log_message + " - Downloaded " + data.percent.toFixed(2) + "%";
    log_message =
      log_message + " (" + data.transferred + "/" + data.total + ")";
    downloadMessage = log_message;
  });

  globalThis.api.updaterInfo.receive("updateDownloaded", (data) => {
    downloading = false;
    updateAvailable = false;
    quitAndInstall = true;
  });

  function install() {
    globalThis.api.updaterInfo.send("quitAndInstall", null);
    quitAndInstall = false;
    isInstalling = true;
  }
</script>

<div>
  {#if !checkingForUpdate && !updateAvailable && !downloading && !quitAndInstall && !isInstalling}
    <button on:click={check}>Check for Update</button>
  {/if}
  {#if checkingForUpdate}
    <span class="message"> Checking for update... </span>
  {/if}
  {#if updateAvailable}
    <button on:click={startDownloadUpdate}
      >Updates are available. Click to download.</button
    >
  {/if}
  {#if updateNotAvailable && !checkingForUpdate}
    <span class="message"> Update not available </span>
  {/if}
  {#if downloading}
    <span class="message">
      {downloadMessage.length > 1 ? downloadMessage : "download..."}
    </span>
  {/if}
  {#if quitAndInstall}
    <button on:click={install}
      >The updates are ready. Click to quit and install.</button
    >
  {/if}
  {#if isInstalling}
    <span class="message"> Installing... </span>
  {/if}
</div>

<style lang="postcss">
  .message {
    @apply rounded-md text-lg m-1 p-2;
  }

  button {
    @apply py-2 px-4 font-semibold rounded-lg border;
  }

  button:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }
</style>
