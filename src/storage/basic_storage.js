export function saveObject(obj, val) {
    localStorage.setItem(obj, val);
}

export function clearObject(obj) {
    localStorage.removeItem(obj);
}

export function getObject(obj) {
    return localStorage.getItem(obj);
}
