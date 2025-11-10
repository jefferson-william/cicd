import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('🏠 Hello from Hono + Bun!'))
app.get('/about', (c) => c.text('ℹ️ About route'))
app.get('/api/json', (c) => c.json({ message: 'Hello JSON!' }))

export default app
