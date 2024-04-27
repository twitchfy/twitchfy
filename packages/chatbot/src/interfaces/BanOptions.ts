/**
 * The options to ban an user.
*/
export interface BanOptions {
    /**
     * The user Id of the user to ban.
     */
    userId: string;
    /**
     * The reason of the ban. If not provided, there will be no reason.
     */
    reason?: string;
}