import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1
  res.json({ status: 'ok', database: connected ? 'connected' : 'not connected' })
})

const port = Number(process.env.PORT ?? 3000)

try {
  await mongoose.connect(process.env.MONGODB_URI ?? '')
  console.log('Connected to MongoDB')
} catch (error) {
  console.error('Could not connect to MongoDB:', (error as Error).message)
}

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
