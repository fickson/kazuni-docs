const fs = require("fs");
const path = require("path");

const REGISTRY_URL = "https://registry.npmjs.org/@kazuni%2Fsdk/latest";
const SIBLING_PACKAGE_JSON = "../../kazuni-js/package.json";

async function versionFromRegistry() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(REGISTRY_URL, { signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) return null;
    const body = await response.json();
    return typeof body.version === "string" ? body.version : null;
  } catch {
    return null;
  }
}

function versionFromSibling() {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, SIBLING_PACKAGE_JSON), "utf8"),
    );
    return typeof pkg.version === "string" ? pkg.version : null;
  } catch {
    return null;
  }
}

module.exports = function packageVersionsPlugin() {
  return {
    name: "package-versions",
    async contentLoaded({ actions }) {
      // The registry is the source of truth: it is what a reader actually installs, and it is
      // the only source reachable from CI. The sibling checkout is a local-development
      // convenience and only exists on a maintainer's machine.
      const sdk = (await versionFromRegistry()) ?? versionFromSibling();

      if (!sdk) {
        throw new Error(
          "package-versions: could not resolve the @kazuni/sdk version from the npm registry " +
            "or from a sibling kazuni-js checkout. Failing the build rather than shipping a " +
            "version badge reading v0.0.0.",
        );
      }

      actions.setGlobalData({ sdk });
    },
  };
};
