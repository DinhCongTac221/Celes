import { SigningStargateClient } from '@cosmjs/stargate';
import axios from 'axios';

const PROXY_URL = 'http://127.0.0.1:8000/proxy';
const API_GATEWAY = 'http://127.0.0.1:26659';

export default {
  async getBalance({ accounts }) {
    const response = await axios.post(PROXY_URL, {
      endpoint: `${API_GATEWAY}/balance/${accounts[0].address}`,
      method: 'GET',
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