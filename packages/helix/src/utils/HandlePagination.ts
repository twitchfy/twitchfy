import { GetFollowersResponse, Pagination } from '@twitchapi/api-types';
import { HelixClient } from '../HelixClient';
import { RequestOptions } from '../interfaces/RequestOptions';

export async function handlePagination(client: HelixClient, endpoint: string, params: string, method: 'GET', userToken?: string, requestOptions?: RequestOptions) {
    
  const data = [];



  if (method === 'GET') {
    let pagination: Pagination | undefined;

    let fetchParams = params;

    do {
      const getData = await client.requestManager.get(endpoint, fetchParams, userToken, requestOptions) as GetFollowersResponse;
      pagination = getData.pagination;

      for (const get of getData.data) {
        data.push(get);
      }

      if (pagination?.cursor) {
        fetchParams = `${params}&after=${pagination.cursor}`;
      }
    } while (pagination?.cursor);

    return data;
  } else {
    return null;
  }

}
