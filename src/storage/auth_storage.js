import { saveObject, clearObject, getObject } from './basic_storage'

export function storeToken(token) {
    saveObject("token", token);
}

export function clearToken() {
    clearObject("token");
}

export function getToken() {
    return getObject("token")
}
