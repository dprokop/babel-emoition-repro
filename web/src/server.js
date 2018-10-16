import express from 'express'
import HTTPPRoxy from 'http-proxy-middleware'
import web from './index'

const port = 8080
const siteUrl = process.env.SITE_URL || 'http://localhost'

const apiProxy = HTTPPRoxy(
  ['/graphql', '/auth', '/attachments', '/redirect', '/health', '/images'],
  {
    changeOrigin: true,
    target: process.env.API_URL,
  },
)

const run = async () => {
  const app = express()
  app.use(apiProxy)
  const server = await web({ app })
  server.listen(port, error => {
    if (error) throw error
    console.log(`> Ready on ${siteUrl}:${port}`)
  })
}

run()
