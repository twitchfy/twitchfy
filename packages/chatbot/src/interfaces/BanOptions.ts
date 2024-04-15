/**
 * The options to ban an user.
*/
export interface BanOptions {
    /**
     * The user ID of the user to ban.
     */
    userID: string;
    /**
     * The reason of the ban. If not provided, there will be no reason.
     */
    reason?: string;
}