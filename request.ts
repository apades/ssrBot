import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import config from './user.conf'

let request = axios.create({
  httpsAgent: config.proxy_server
    ? new HttpsProxyAgent(config.proxy_server)
    : undefined,
  headers: config.proxy_defaultHeaders ?? {},
})
export default request
