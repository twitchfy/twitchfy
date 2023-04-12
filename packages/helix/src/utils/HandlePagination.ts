import { Pagination } from "@twitchapi/api-types"
import { HelixClient } from "../HelixClient"

export async function handlePagination(client: HelixClient, endpoint: string, params: string, method: "GET", userToken?: string) {
    const data = [];



    if (method === "GET") {
        let pagination: Pagination | undefined;

        do {
            const getData = await client.requestManager.get(endpoint, params, userToken);
            pagination = getData.pagination;

            for (const get of getData.data) {
                data.push(get);
            }

            if (pagination?.cursor) {
                params = `${params}&after=${pagination.cursor}`;
            }
        } while (pagination?.cursor);

        return data;
    } else {
        return null
    }

}
