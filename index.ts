import app from './src/server'

export default {
	fetch: app.fetch,
	port: process.env.PORT ? Number(process.env.PORT) : 3000,
}
