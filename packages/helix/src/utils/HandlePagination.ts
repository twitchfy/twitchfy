import { Pagination } from "@twitchapi/api-types"
import { HelixClient } from "../HelixClient"

export async function handlePagination(client: HelixClient, endpoint: string, params: string, method: "GET", userToken?: string) {
    const data = [];



    if (method === "GET") {
        let pagination: Pagination | undefined;

        let fetchParams = params;

        do {
            const getData = await client.requestManager.get(endpoint, fetchParams, userToken);
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
        return null
    }

}
