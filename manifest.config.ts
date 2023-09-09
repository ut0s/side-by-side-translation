import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageJson from './package.json'

const { version, name } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : "__MSG_pkg_name__",
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  description: "__MSG_description__",
  default_locale: "en",
  action: {
    default_title: "__MSG_default_title__",
    // default_popup: 'src/popup/index.html',
    "default_icon": {
      // "16": "src/assets/icon_off_16.png",
      // "32": "src/assets/icon_off_16.png"
      "64": "src/assets/icon_OFF_64.png",
      "128": "src/assets/icon_OFF_128.png",
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: ['src/content-script/index.ts'],
      matches: ['*://*/*'],
      run_at: 'document_end',
    },
  ],
  host_permissions: ['*://*/*'],
  // options_page: 'src/options/index.html',
  permissions: ['storage', 'scripting', 'tabs'],
  commands: {
    "toggle_side-by-side": {
      "suggested_key": {
        "default": "Ctrl+I",
        "mac": "Command+I",
        "chromeos": "Ctrl+I",
        "linux": "Ctrl+I"
      },
      "description": "__MSG_command_desc__"
    },
  },
  icons: {
    "64": "src/assets/icon_ON_64.png",
    "128": "src/assets/icon_ON_128.png",
  },
  web_accessible_resources: [
    {
      matches: ['*://*/*'],
      resources: ['src/content-script/index.ts'],
    },
    {
      matches: ['*://*/*'],
      resources: ['src/assets/icon_ON_64.png', 'src/assets/icon_ON_128.png'],
    },
    // {
    //   matches: ['*://*/*'],
    //   resources: ['src/content-script/iframe/index.html'],
    // },
  ],
}))
