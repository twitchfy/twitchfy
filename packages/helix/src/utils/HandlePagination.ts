import type { Pagination } from '@twitchfy/api-types';
import type { HelixClient } from '../HelixClient';
import type { PaginationResponses, RequestOptions } from '../types';

export async function handlePagination(client: HelixClient, endpoint: string, params: string, method: 'GET', requestOptions?: RequestOptions<'app' | 'user', true>) {
    
  const data = [];



  if (method === 'GET') {

    let pages = 1;

    let pagination: Pagination | undefined;

    let fetchParams = params;

    do {

      const getData = await client.requestManager.get(endpoint, fetchParams, requestOptions) as PaginationResponses;

      pagination = getData.pagination;

      for (const get of getData.data) {
        data.push(get);
      }

      pages++;

      if (pagination?.cursor) {
        fetchParams = `${params}&after=${pagination.cursor}`;
      }
      
    } while (pages <= (requestOptions?.pages || Infinity) && pagination?.cursor);
    
    return data;
  } else {
    return null;
  }

}
