import axios from 'axios';

const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const NODE_API_GATEWAY = process.env.REACT_APP_NODE_API_GATEWAY;

console.log(process.env);

export default {
  async getBalance({ accounts }) {
    const response = await axios.post(PROXY_URL, {
      endpoint: `${NODE_API_GATEWAY}/balance/${accounts[0].address}`,
      method: 'get',
    });

    return response.data;
  },

  async getValidators(endpoint) {
    const response = await axios.post(PROXY_URL, {
      endpoint: `${endpoint}/validators?per_page=200`,
      method: 'GET',
    });

    return response.data;
  },

  async submitPFB(ip, port, namespaceId, data, gasLimit, fee) {
    const response = await axios.post(PROXY_URL, {
      endpoint: `http://${ip}:${port}/submit_pfb`,
      method: 'POST',
      data: {
        namespace_id: namespaceId,
        data: Buffer.from(data).toString("hex"),
        gas_limit: gasLimit,
        fee,
      }
    });

    return response.data;
  }
}