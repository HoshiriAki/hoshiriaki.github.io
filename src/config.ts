import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'StarField',
  subtitle: 'Private Site',
  lang: 'zh_CN', // 'en', 'zh_CN', 'zh_TW', 'ja'
  themeColor: {
    hue: 210, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: true, // Hide the theme color picker for visitors
  },
  banner: {
    enable: false,
    src: 'assets/images/demo-banner.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center', // Equivalent to object-position, defaults center
    credit: {
      enable: false, // Display the credit text of the banner image
      text: '', // Credit text to be displayed
      url: '', // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    {
      src: '/favicon/favicon-light-128.png', // Path of the favicon, relative to the /public directory
      theme: 'light', // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      sizes: '128x128', // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
    {
      src: '/favicon/favicon-dark-128.png', // Path of the favicon, relative to the /public directory
      theme: 'dark', // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
      sizes: '128x128', // (Optional) Size of the favicon, set only if you have favicons of different sizes
    },
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.Calendar,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/HoshiriAki', // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/demo-avatar.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: '秋星海(あき ほしみ)',
  bio: 'Go to the future',
  links: [
    {
      name: 'X(Twitter)',
      icon: 'fa6-brands:square-x-twitter', // Visit https://icones.js.org/collection/fa6-brands for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://x.com/Hoshiri_Aki',
    },
    {
      name: 'Steam',
      icon: 'fa6-brands:steam',
      url: 'https://steamcommunity.com/id/Hoshiri_Sama/',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/HoshiriAki',
    },
    {
      name: 'Mail',
      icon: 'material-symbols:mail',
      url: 'mailto:Hoshiriakie@gmail.com',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  default: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
