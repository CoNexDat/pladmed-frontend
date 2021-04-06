import { requestGetAuth, requestPostAuth } from './basic_requester'

const MY_OPERATIONS_URL = "operations/me"
const OPERATION_URL = "operation"

export async function requestMyOperations(token) {
    return requestGetAuth(MY_OPERATIONS_URL, token)
}

export async function requestCreateOperation(
    operation, format, params, probes, token
) {
    let probesIds = [];

    for (const probe of probes) {
        probesIds.push(probe["identifier"])
    }

    const data = {
        probes: probesIds,
        params: params,
        result_format: format
    }

    return requestPostAuth(operation.toLowerCase(), data, token)
}

export async function requestFindOperation(operation, token) {
    return requestGetAuth(OPERATION_URL + "?id=" + operation, token)
}
