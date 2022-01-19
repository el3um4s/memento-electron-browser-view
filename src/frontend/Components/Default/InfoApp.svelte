<script lang="ts">
  let app: string = "-";

  let chrome: string = "-";
  let node: string = "-";
  let electron: string = "-";

  globalThis.api.systemInfo.send("requestSystemInfo", null);
  globalThis.api.systemInfo.receive("getSystemInfo", (data) => {
    chrome = data.chrome;
    node = data.node;
    electron = data.electron;
  });

  globalThis.api.updaterInfo.send("requestVersionNumber", null);

  globalThis.api.updaterInfo.receive("getVersionNumber", (data) => {
    app = data.version;
  });
</script>

<div>
  <ul>
    <li>Version: <b>{app}</b></li>
    <li>Node.js: <b>{node}</b></li>
    <li>Chromium: <b>{chrome}</b></li>
    <li>Electron: <b>{electron}</b></li>
  </ul>
</div>

<style>
</style>
