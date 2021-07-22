const ICONS_DIR = 'build/icons/'

const windowsOS = {
  win: {
    icon: ICONS_DIR + 'icon.ico',
    publisherName: 'decimalteam',
    target: 'nsis'
  },

  nsis: {
    differentialPackage: true
  }
}

const linuxOS = {
  linux: {
    icon: ICONS_DIR,
    target: 'deb',
    category: 'Utility'
  }
}

const macOS = {
    mac: {
      hardenedRuntime: true,
      target: 'default',
      artifactName: '${productName}-${version}-${os}.${ext}',
      category: 'public.app-category.utilities',
      provisioningProfile: 'mac_app_store.provisionprofile',
      icon: ICONS_DIR + 'icon.icns',
      entitlements: 'build/entitlements.mas.plist',
      entitlementsInherit: 'build/entitlements.mas.inherit.plist',
      gatekeeperAssess: false
    },
  // mas: {
  //   hardenedRuntime: false,
  //   type: 'distribution',
  //   category: 'public.app-category.utilities',
  //   entitlements: 'build/entitlements.mas.plist',
  //   entitlementsInherit: 'build/entitlements.mas.inherit.plist',
  //   icon: ICONS_DIR + 'icon.icns'
  // },
  // dmg: {
  //   contents: [
  //     {
  //       x: 410,
  //       y: 150,
  //       type: 'link',
  //       path: '/Applications'
  //     },
  //     {
  //       x: 130,
  //       y: 150,
  //       type: 'file'
  //     }
  //   ]
  // }
}

module.exports = {
  asar: true,
  productName: 'DecimalWallet',
  appId: 'com.decimal.chain',
  directories: {
    output: 'build',
    buildResources: ICONS_DIR,
  },
  // default files: https://www.electron.build/configuration/contents
  files: [
    'package.json',
    {
      from: 'dist/main/',
      to: 'dist/main/'
    },
    {
      from: 'dist/renderer',
      to: 'dist/renderer/'
    },
    {
      from: 'src/resources/',
      to: 'dist/resources/'
    }
  ],
  ...windowsOS,
  ...linuxOS,
  ...macOS
}
