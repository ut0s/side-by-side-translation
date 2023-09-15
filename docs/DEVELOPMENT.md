## I used this GitHub Template

Thank you.

[Create a repo from this template on GitHub](https://github.com/mubaidr/vite-vue3-chrome-extension-v3/generate).

## Folders

- `src` - main source.
  - `content-script` - scripts and components to be injected as `content_script`
    - `iframe` content script iframe vue3 app which will be injected into page
  - `background` - scripts for background.
  - `popup` - popup vuejs application root
    - `pages` - popup pages
  - `options` - options vuejs application root
    - `pages` - options pages
  - `pages` - application pages, common to all views (About, Contact, Authentication etc)
  - `components` - auto-imported Vue components that are shared in popup and options page.
  - `assets` - assets used in Vue components
- `dist` - built files, also serve stub entry for Vite on development.

## Development

```bash
yarn dev
```

Then **load extension in browser with the `dist/` folder**.

## Build

To build the extension, run

```bash
yarn build
```
