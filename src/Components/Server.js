const express = require("express")
const request = require("request")
const app = express()
const PORT = process.env.PORT || 5000

app.get("/proxy", (req, res) => {
	const fileId = req.query.fileId
	const url = `https://drive.google.com/uc?export=download&id=${fileId}`
	request(url).pipe(res)
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
