const { RESOURCES_DIR } = require('./config')

const RESOURCES_DIR_PATH = RESOURCES_DIR.replace(/\\/g, '/')

const isProduction = process.env.NODE_ENV === 'production'

function devPath ()  {
  // resolve during compilation
  return `
    global.__resources = \`${RESOURCES_DIR_PATH}\`;
  `
}

function productionPath () {
  return `process.resourcesPath`; // Keep path provided by Electron
}
function pathFromRendererOnRuntime () {
  // resolve on runtime
  // path depends on production directory structure

  // renderer entry: ./dist/renderer/index.html
  // resources: ./dist/resources/
  return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `
}

function pathFromMainOnRuntime () {
  // resolve on runtime
  // path depends on production directory structure

  // main entry: ./dist/main/index.js
  // resources: ./dist/resources/
  return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `
}
module.exports = {

  // MAIN PROCESS

  mainProcess () {
    return isProduction ? productionPath() : devPath()
  },

  // RENDERER PROCESS

  nuxtClient () {
    return isProduction ? productionPath() : devPath()
  },

  nuxtServer: devPath

}
