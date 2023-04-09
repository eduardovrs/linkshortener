import api from './api';

class GetUserShortedLinks {
  /**
   * @description
   * @param {url} url user's selected url
   * @returns {Promise<string | false>} returns the response of the api if success or false if fails
   */

  async getShortedLinks(url: string): Promise<string | false> {
    try {
      const response = await api.post(`shorten?url=${url}`);
      return response.data.result.short_link;
    } catch (error: any) {
      if (error) {
        console.log('getShortedLinks', error.response.data);
        return false;
      }
    }
    return false;
  }
}

export default new GetUserShortedLinks();
