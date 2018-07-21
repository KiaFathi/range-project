import fetch from 'isomorphic-unfetch';

export default class MountainProject {
  constructor(key) {
    if (!key) {
      throw new Error('API key required for MountainProject');
    }
    this.baseURL = 'https://www.mountainproject.com/data';
    this.key = key;
  }
  async getUser(userId) {
    const res = await fetch(
      `${this.baseURL}/get-user?userId=${userId}&key=${this.key}`,
    );
    const data = await res.json();
    return data;
  }
  async getTicks(userId) {
    const res = await fetch(
      `${this.baseURL}/get-ticks?userId=${userId}&key=${this.key}`,
    );
    const data = await res.json();
    return data;
  }
  async getRoutes(routeIds) {
    const res = await fetch(
      `${this.baseURL}/get-routes?routeIds=${routeIds.join(',')}&key=${
        this.key
      }`,
    );
    const data = await res.json();
    return data;
  }
}
