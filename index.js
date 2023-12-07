const { request } = require('undici')

const requester = async () => {
	const url = 'https://www.youtube.com/watch?v=Rc6xBsiI6y8'

	let body
	const req = await request(url)
	// if (req.headers['content-type'].includes('application/json')) console.log(req.body.json(), 11)
	body = await req.body.text()

	const re = /"hlsManifestUrl":(.*?)},/
	const match = body.match(re)

	const hlsManifestUrl = match[1].replaceAll('"','')
	const newHlsManifestUrl = new URL(hlsManifestUrl)
	const hlsManifestReq = await request(newHlsManifestUrl)
	const hlsBody = await hlsManifestReq.body.text()
	console.log(hlsBody)
}

requester()