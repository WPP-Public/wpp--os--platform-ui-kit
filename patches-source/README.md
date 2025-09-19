# Patching Stencil

The main goal of these Stencil patches is to provide support for versioning of the generated web components.

The [patch-package](https://github.com/ds300/patch-package) library is used to apply the changes.

## ⚙️⚙️ How it works

Before building the project we set the `tagNamePostfix` flag in the main package's build script:
```
packages/components-library/package.json
```

E.g. `stencil build --docs --tagNamePostfix v1-2-0`.

This flag sets the versioning postfix for the web components and all patched output targets:
- Vanilla web components
- React wrappers
- Angular wrappers
- Vue wrappers

## 🧑‍🔧 Updating patches and / or Stencil version

To make the necessary changes follow these steps:
1. Clone the [Stencil repo](https://github.com/ionic-team/stencil):
```shell
git clone https://github.com/ionic-team/stencil.git
```
2. View the latest source patch version in the current folder (e.g. `stencil-core/stencil-2.17.2.patch`) and checkout the corresponding tag in the cloned repo:
```shell
git checkout v2.17.2
```
3. Create a new branch and apply the source patch, commit the changes.
4. If you need to update the Stencil version, **rebase** onto the necessary version tag and resolve conflicts, if any. E.g. rebase your local branch onto the `v2.17.3` tag commit.
5. Now you can modify the versioning feature, if needed. Commit the changes.
6. In the patched repo the `release.prepare` script actually creates a production bundle, so run it:
```shell
npm run release.prepare
```
7. The last step of the script - `Validate build` - will most likely fail with a NodeJS-related error, it can be ignored:
```js
'perf_hooks' is imported by internal/hydrate/index.js, but could not be resolved – treating it as an external dependency
```
8. Pack the resulting bundle:
```shell
npm pack
```
9. If Stencil version was updated in step 4, first install the new version in `platform-ui-kit` and commit the changes.
10. Replace the stencil package with the packed local bundle in `platform-ui-kit`:
```json
"dependencies": {
  "@stencil/core": "file:../../../../stencil/stencil-core-2.17.3.tgz"
},
```
10. Make sure to apply the local bundle by installing:
```shell
npm install
```
11. Check if the patch is working as expected - build the project, run the examples, etc.
12. If everything works fine, it's time to generate the patch with `patch-package`. Revert the `package.json` and `package-lock.json` file changes without using npm install. This will leave the `node_modules` folder with all the changes we did previously.
13. Use the `patch-package` to generate a new patch:
```shell
npx patch-package @stencil/core
```
14. Export your changes as a patch from the Stencil repo. Save it in the `patches-source`.
15. (Optional) If Stencil output targets also need an update, follow the same steps with the [output targets repo](https://github.com/ionic-team/stencil-ds-output-targets). Use the install and build steps as described in the output targets repo:
```shell
npm install
npm run bootstrap
npm run build
```
