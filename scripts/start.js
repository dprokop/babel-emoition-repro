const path = require('path')
const express = require('express')
const forceSSL = require('force-ssl-heroku')

const port = process.env.PORT || 8080

// HEROKU_APP_NAME is used for review apps on Heroku
if (!process.env.API_URL && process.env.HEROKU_APP_NAME) {
  process.env.API_URL = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.API_URL = process.env.API_URL || `http://localhost:${port}`
process.env.OBOS_API_URL = process.env.OBOS_API_URL || `${process.env.API_URL}/obos`
process.env.OIDC_CALLBACK_URI = process.env.OIDC_CALLBACK_URI || `${process.env.API_URL}/auth/callback`
process.env.OIDC_PROVIDER_URI = process.env.OIDC_PROVIDER_URI || `${process.env.API_URL}/oidc`
process.env.DEFAULT_LOGIN_URL = process.env.DEFAULT_LOGIN_URL || `${process.env.API_URL}/oidc/authorize?response_type=code&redirect_uri=${process.env.OIDC_CALLBACK_URI}&scope=openid`

const forceSiteUrl = (req, res, next) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol
  if (`${protocol}://${req.host}` !== process.env.SITE_URL) {
    res.redirect(process.env.SITE_URL + req.originalUrl)
  } else {
    next()
  }
}

const start = async () => {
  const server = express()
  const web = require('../web/build')

  server.use(forceSSL)

  if (process.env.SITE_URL) {
    server.use(forceSiteUrl)
  }

  server.use(await web({ dev: false }))

  server.listen(port, error => {
    if (error) throw error
    console.log(`> Ready on http://localhost:${port}`)
  })
}

start()
