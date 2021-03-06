import * as types from './types'
import auth from './auth'


export const set_session_study = (bool) => dispatch => {
    if (bool === true) {
        dispatch({
            type: types.NEW_STUDY_SESSION
        })
    } else if (bool === false) {
        dispatch({
            type: types.SESSION_STUDY_END
        })
    } else {
        console.log('set_session_study no accept', bool)
    }
}
export const get_book = (bool) => async dispatch => {
    try {
        const res = await fetch('/api/01/user_book/', {
            method: 'GET',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const userData = await res.json()
        // resultado exitoso o fail
        if (res.status === 200) {
            dispatch({
                type: types.GET_BOOK_SUCCESS,
                payload: userData.success  // => res wordbook user data user
            })
            // dispatch(auth_action())

            if (bool !== undefined) {
                dispatch(set_session_study(bool))
            }
        } else {
            dispatch({
                type: types.GET_BOOK_FAIL
            })
        }

        dispatch(auth_action())

    } catch (error) {
        dispatch({
            type: types.GET_BOOK_FAIL
        })


    }
}
export const add_word = (formData) => async dispatch => {
    const const_body = JSON.stringify(formData)
    try {
        const res = await fetch('/api/01/user_book/', {
            method: 'POST',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
            body: const_body
        })
        const data = await res.json()
        // resultado si agrega al libro o se tomo uno existente o fail

        dispatch(get_book())

        if (res.status === 200) { // create and adde to userbook
            dispatch({
                type: types.WORD_BOOK_ADD_SUCCESS,
                payload: `${data.success}`

            })
        } else {
            dispatch({
                type: types.WORD_BOOK_ADD_FAIL,
                payload: `${res.status} ${data.error}`
            })

        }

    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.AUTH_FAIL
        })
    }
}

export const delete_user_book = (formData) => async dispatch => {
    const const_body = JSON.stringify(formData)
    try {
        const res = await fetch('/api/01/user_book/set/', {
            method: 'DELETE',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
            body: const_body
        })
        const data = await res.json()

        // resultado si agrega al libro o se tomo uno existente o fail
        dispatch(get_book())
        if (res.status === 201) { // create and adde to userbook
            dispatch({
                type: types.WORD_BOOK_DELETE_SUCCESS
            })
        } else {
            console.log(`status ${res.error} data ${data} error ${data.error}`)
            dispatch({
                type: types.WORD_BOOK_DELETE_FAIL,
                payload: `status ${res.status} data ${data.error}`
            })
        }
    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.AUTH_FAIL
        })
    }
}

export const current_session = (formData, bool) => async dispatch => {


    // mandar los datos de estudio en tiempo real al backend si la respuesta es corrcta
    const const_body = JSON.stringify(formData)

    if (bool) {
        const res = await fetch('/api/01/user_book/study_session/', {
            method: 'POST',
            headers: {
                'Action': 'application/json',
                'Content-Type': 'application/json'
            },
            body: const_body
        })
        // resultado si agrega al libro o se tomo uno existente o fail
        dispatch(get_book())
        if (res.status === 201) { // create and adde to userbook
            dispatch({
                // agrega las cartas estudiadas al redux
                type: types.CORRECT_WORD_STUDY, payload: formData
            })
        } else {
            dispatch({
                type: types.SET_WORD_STUDY_FAIL
            })
        }

        // agrega un punto negativo a la current word y la manda al final 
    } else if (bool === false) {
        dispatch({
            type: types.FAIL_WORD_STUDY, payload: formData
        })
    }


}

export const set_current = (data) => dispatch => {

    if (data === 0) {
        dispatch({
            type: types.RESET_CURRENT,
        })
    } else if (data > 0) {
        dispatch({
            type: types.NEXT_CURRENT,
            payload: data
        })
    } else if (data < 0) {
        dispatch({
            type: types.PREVIOUS_CURRENT,
            payload: data
        })
    } else {
        dispatch({
            type: types.SET_CURRENT_FAIL,
        })
    }
}


export const get_gTTS = (card) => async dispatch => {

    const const_body = JSON.stringify(card)


    try {
        // useEffect(() => {
        //   const getgTTS = async (data = "") => {
        //     try {
        //       const res = await fetch('/api/01/user_book/gtts/', {
        //         method: 'POST',
        //         headers: {
        //           'Action': 'application/json',
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //       })
        //       const resUrl = await res.json()
        //       setUrl(resUrl.success)

        //     } catch (error) {
        //       console.log(error)
        //     }
        //   }

        //   if (current_card !== undefined) {
        //     setTimeout(async () => {
        //       await getgTTS(current_card.terms.word)
        //     }, 500);
        //   }
        // }, [current_card])

    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.AUTH_FAIL
        })
    }
}