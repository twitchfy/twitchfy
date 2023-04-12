import { Badges } from "../../interfaces/Badges";
import { PrivMSGTags } from "../../interfaces/tags/PrivMSGTags";

/**
 * @class
 * Represents the chat badges of a chatter.
 */
export class PrivMSGBadges{

    /**
     * @description The badges of the chatter.
     */
    public badges: Badges

    /**
     * 
     * @param tags 
     */
    public constructor(tags: PrivMSGTags){

        this.badges = tags.badges || { }
    }

    /**
     * Check if the chatter has this badge in his chat profile.
     * @param {string} badge The name of the badge you want to check. 
     * @returns {boolean} A boolean that determines if the chatter has the badge in his chat profile.
     */
    public has(badge: keyof Badges) : boolean {
        if(this.badges[badge]) return true

        return false
    }

}
