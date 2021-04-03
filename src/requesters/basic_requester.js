import axios from 'axios';
import { URL } from '../config/connection'

export async function requestPost(path, params) {
    let res = await axios.post(URL + path, params);

    return [res.status, res.data]
}
