import { requestPost, requestGetAuth } from './basic_requester'

const LOGIN_URL = "login"
const REGISTER_URL = "register"
const USER_URL = "users/me"

export async function requestLogin(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(LOGIN_URL, data)
}

export async function requestRegister(email, password) {
    const data = {
        email: email,
        password: password
    }

    return requestPost(REGISTER_URL, data)
}

export async function requestUserData(token) {
    return requestGetAuth(USER_URL, token)
}
