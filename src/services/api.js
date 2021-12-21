import axios from 'axios'

const URL_API = 'https://run.mocky.io/v3'

const api = axios.create({
    baseURL: URL_API
})

export default api