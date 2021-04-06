import { requestGetAuth, requestPostAuth } from './basic_requester'

const PROBES_URL = "probes"
const MY_PROBES_URL = "probes/me"

export async function requestAllProbes(token) {
    return requestGetAuth(PROBES_URL, token)
}

export async function requestMyProbes(token) {
    return requestGetAuth(MY_PROBES_URL, token)
}

export async function requestRegisterProbe(latitude, longitude, token) {
    const data = {
        location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
    }

    return requestPostAuth(PROBES_URL, data, token)
}
