const path = require('path')
const express = require('express')
const forceSSL = require('force-ssl-heroku')

const dotenv = require('dotenv')

dotenv.config({ silent: true })

const port = process.env.PORT || 8080
const runningOnHeroku = process.env.BUILDPACK_URL && process.env.DYNO

process.env.API_URL = process.env.API_URL || `http://localhost:${port}`
process.env.OBOS_API_URL = process.env.OBOS_API_URL || `${process.env.API_URL}/obos`
process.env.OIDC_CALLBACK_URI = process.env.OIDC_CALLBACK_URI || `${process.env.API_URL}/auth/callback`
process.env.OIDC_PROVIDER_URI = process.env.OIDC_PROVIDER_URI || `${process.env.API_URL}/oidc`
process.env.DEFAULT_LOGIN_URL = process.env.DEFAULT_LOGIN_URL || `${process.env.API_URL}/oidc/authorize?response_type=code&redirect_uri=${process.env.OIDC_CALLBACK_URI}&scope=openid`

if (runningOnHeroku) {
  server.use(forceSSL)
}

const start = async () => {
  const server = express()
  const web = require('../web/dev')

  server.use(await web({ dev: true }))

  server.listen(port, error => {
    if (error) throw error
    console.log(`> Ready on http://localhost:${port}`)
  })
}

start()
