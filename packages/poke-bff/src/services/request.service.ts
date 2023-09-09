import axios, { AxiosRequestConfig } from 'axios';

export class RequestService {
  private instance = axios.create();

  async send<Response>(request: AxiosRequestConfig<any>) {
    try {
      console.log('request: ', { ...request });
      return await this.instance.request<Response>(request);
    } catch (error) {
      console.error('ERROR:', error);
      throw error;
    }
  }
}
