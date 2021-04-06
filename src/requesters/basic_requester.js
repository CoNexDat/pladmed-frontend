import axios from 'axios';
import { URL } from '../config/connection'

export async function requestPost(path, params) {
    try {
        let res = await axios.post(URL + path, params);

        return [res.status, res.data]
    } catch (error) {
        return [error.response.status, error.response.data]
    }
}

export async function requestGetAuth(path, token) {
    try {
        let res = await axios.get(
            URL + path,
            {
                headers: {
                    access_token: token
                }
            }
        );

        return [res.status, res.data]
    } catch (error) {
        return [error.response.status, error.response.data]
    }
}

export async function requestPostAuth(path, params, token) {
    try {
        let res = await axios.post(
            URL + path,
            params,
            {
                headers: {
                    access_token: token
                }
            }
        );

        return [res.status, res.data]
    } catch (error) {
        return [error.response.status, error.response.data]
    }
}
