import { fetcher } from './fetcher';

type FetchInstanceType = typeof fetcher;
type Id = string | number;

class FetchData<T> {
  constructor(
    private readonly baseUrl: string,
    private readonly fetchInstance: FetchInstanceType
  ) {
    this.fetchInstance;
    this.baseUrl;
  }

  async post<I>(endpoint: string, input: I) {
    const response = await this.fetchInstance<T>(
      `${this.baseUrl}/${endpoint}`,
      'POST',
      input
    );
    return response;
  }

  async get() {
    const response = await this.fetchInstance<T>(this.baseUrl, 'GET');
    return response;
  }

  async getById(id: Id) {
    const response = await this.fetchInstance<T>(
      `${this.baseUrl}/${id}`,
      'GET'
    );
    return response;
  }

  async put<O>(id: Id, input: O) {
    const response = await this.fetchInstance<T>(
      `${this.baseUrl}/${id}`,
      'PUT',
      input
    );
    return response;
  }

  async delete(id: Id) {
    const response = await this.fetchInstance<T>(
      `${this.baseUrl}/${id}`,
      'DELETE'
    );
    return response;
  }
}

export default FetchData;
