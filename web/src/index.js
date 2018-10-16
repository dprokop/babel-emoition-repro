const path = require('path')
const express = require('express')
const next = require('next')
const routes = require('./routes')
const basicAuth = require('express-basic-auth')
const checkBrowserSupport = require('./checkBrowserSupport')

module.exports = async ({ dev = process.env.NODE_ENV !== 'production', app = express() } = {}) => {
  const server = next({ dev, dir: __dirname })
  await server.prepare()

  if (process.env.VERSION) {
    app.use((req, res, next) => {
      res.setHeader('X-Application-Version', process.env.VERSION)
      next()
    })
  }

  if (process.env.PASSWORD) {
    app.use(basicAuth({ users: { admin: process.env.PASSWORD }, challenge: true }))
  }

  app.use(checkBrowserSupport)
  app.use('/healthz', (req, res) => res.sendStatus(200))
  app.use(express.static(path.join(__dirname, '../public')))
  app.use((req, res) => routes.getRequestHandler(server)(req, res))

  return app
}
