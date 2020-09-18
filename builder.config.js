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
    category: 'Utility',
    synopsis: 'Desktop Wallet Decimal Chain'
  }
}

const macOS = {
  mac: {
    target: 'dmg',
    icon: ICONS_DIR + 'icon.icns',
  },
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  }
}

module.exports = {
  asar: true,
  productName: 'Decimal Wallet',
  appId: 'com.decimal.wallet.desktop',
  directories: {
    output: 'build',
    buildResources: 'assets', // это вроде не нужно
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
