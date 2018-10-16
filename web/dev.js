const babelRegister = require('@babel/register')
const chokidar = require('chokidar')
const path = require('path')
const express = require('express')
const next = require('next')
const routes = require('./src/routes')

const sourcePath = path.resolve(__dirname, './src')

babelRegister({
  only: [sourcePath],
  extensions: ['.js'],
  babelrcRoots: true,
})

const watcher = chokidar.watch(sourcePath)
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache)
      .filter(key => key.startsWith(sourcePath))
      .forEach(key => {
        delete require.cache[key]
      })
  })
})

module.exports = async ({ dev = process.env.NODE_ENV !== 'production' } = {}) => {
  const server = next({ dev, dir: path.join(__dirname, './src') })
  await server.prepare()

  const app = express()
  app.use(express.static(path.join(__dirname, './public')))
  app.use((req, res) => routes.getRequestHandler(server)(req, res))

  return app
}
