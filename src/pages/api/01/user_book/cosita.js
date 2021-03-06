// /api/01/wordbook/addword/
import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API

export default async function addword(request, response) {
    const save_cookies = cookie.parse(request.headers.cookie ?? '')
    const access = save_cookies.access
    // api backend > BACKEND_DJANGO_API/api/words/ 

    const sendData = JSON.stringify(request.body)
    if (request.method === 'DELETE') {
        try {
            const apiRes = await fetch(`${backend_api}/api/words/setword/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                },
                body: sendData
            });
            const data = await apiRes.json()

            //  201 created  202 acepted and added 406 no lo crea ni lo acepta
            if (apiRes.status === 201) {
                return response.status(201).json({ success: data.success })

            } else if (apiRes.status === 202) {
                return response.status(202).json({ success: data.success, })
                
            } else if (apiRes.status === 406) {
                return response.status(406).json({ error:` ${data.error} ` })
            }
        } catch (error) {
            response.status(402).json({ error: `Server error ${request.method}` })
        }
    } else {
        console.log('401')
        response.status(401).json({ error: `no soporta method ${request.method}` })
    }
}