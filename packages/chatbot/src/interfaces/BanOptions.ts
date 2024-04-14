/**
 * The options to ban an user.
 * @param userID The ID of the user to ban.
 * @param reason The reason of the ban.
 */
export interface BanOptions {
    userID: string;
    reason?: string;
}