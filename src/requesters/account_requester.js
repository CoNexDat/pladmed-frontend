import { requestPost } from './basic_requester'

const LOGIN_URL = "login"
const REGISTER_URL = "register"

export function requestLogin(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(LOGIN_URL, data)
}

export function requestRegister(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(REGISTER_URL, data)
}
