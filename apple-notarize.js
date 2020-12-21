const { notarize } = require('electron-notarize');

module.exports = async (context) => {
  const { electronPlatformName } = context;
  if (electronPlatformName === 'darwin') {
    try {
      console.log('Try notarize app');
      await notarize({
        appBundleId: 'com.decimal.chain',
        appPath: './build/mac/DecimalWallet.app',
        appleId: process.env.appleId,
        appleIdPassword: process.env.appleASP,
      });
      console.log('Success notarize');
    } catch (err) {
      console.log(err);
    }
  }
};
