import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async proxy({ endpoint, method, data }) {
    const request = method === 'GET' ? axios.get(endpoint) : axios.post(endpoint, data);

    const response = await request;
    console.log(response.data);

    return response.data;
  }
}
