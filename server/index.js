import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())

async function loadUsers() {
	const data = await fs.readFile('employee-info.json', 'utf-8')
		.then(res => JSON.parse(res))
		.catch(err => console.log(err))
	return data
}

app.get('/api/users', async(req, res) => {
	const users = await loadUsers()
	res.json(users)
})

app.get('/api/users/image/:eid', async (req, res) => {
	const { eid } = req.params
	const imagePath = path.join(__dirname, 'profile images', `eimg${eid}.png`)
	res.sendFile(imagePath, err => {
		if (err) {
			res.status(404).send('Image not found')
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
