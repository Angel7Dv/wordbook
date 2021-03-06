// /api/01/bookwords/
import cookie from 'cookie'
const backend_api = process.env.BACKEND_DJANGO_API

export default async function gtts(request, response) {
    //  guardados en los cookies
    const save_cookies = cookie.parse(request.headers.cookie ?? '')

     // get book user > http://127.0.0.1:8000/api/words/ 

    const refresh = save_cookies.refresh
    const access = save_cookies.access
    const sendData = request.body

    const url =`${backend_api}/api/words/gttsApi/`+ sendData
    try {
        const apiRes = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access}`, // da una respuesta al backend con nuestro usuario
            },
        });
        // const data = await apiRes.json()
        return response.status(200).json({ success: url })
        
    } catch (error) {
        console.log('400 api next',error)
        return response.status(400).json({ error: 'algun error' })

        
    }

    // if (apiRes.status === 200) {

    // if (request.method === 'POST') {
    //     try {
    //         // REFRESH
           
    //         } else {
    //             console.log('index?')
    //             return response.status(500).json({error: data})
    //         }
    //     } catch (error) {
    //         console.log('402')
    //         response.status(402).json({ error: `solicitud fallida ${request.method}` })
    //     }
    // } else {
    //     console.log('401')
    //     response.status(401).json({ error: `no soporta method ${request.method}` })
    // }
}