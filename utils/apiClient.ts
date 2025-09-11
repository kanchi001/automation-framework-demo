import { APIRequestContext, request } from '@playwright/test';
import { config } from '../config/env';

export class APIClient {
  readonly context: APIRequestContext;
  readonly baseURL: string;

  constructor(context: APIRequestContext) {
    this.context = context;
    this.baseURL = config().baseURL;
  }

  async get(endpoint: string) {
    return this.context.get(`${this.baseURL}${endpoint}`);
  }

  async post(endpoint: string, data: any) {
    return this.context.post(`${this.baseURL}${endpoint}`, { data });
  }

  async put(endpoint: string, data: any) {
    return this.context.put(`${this.baseURL}${endpoint}`, { data });
  }

  async delete(endpoint: string) {
    return this.context.delete(`${this.baseURL}${endpoint}`);
  }
}
