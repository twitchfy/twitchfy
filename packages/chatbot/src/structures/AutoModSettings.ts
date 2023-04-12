import { ChatBot } from "../ChatBot"
import { Channel } from "./Channel"
import { AutoModSettings as AutoModSettingsData } from "@twitchapi/api-types"
import { AutoModSettingsBody, AutoModSettingsOptions } from "@twitchapi/helix"

/**
 * @class
 * Represents the settings of the automod.
 */
export class AutoModSettings {

    /**
     * @description The current instance of the {@link ChatBot}.
     */
    public chatbot: ChatBot

    /**
     * @description The channel whose autmod is.
     */
    public channel: Channel

    /**
     * @description The overallLevel of the automod. 
     */
    public overallLevel: number | null

    /**
     * @description The disability level of the automod.
     */
    public disability: number

    /**
     * @description The aggression level of the automod.
     */
    public aggression: number

    /**
     * @description The level of sexuality of the automod.
     */
    public sexOrGen: number

    /**
     * @description The level of misogyny of the automod.
     */
    public misogyny: number

    /**
     * @description The level of bullying of the automod.
     */
    public bullying: number

    /**
     * @description The level of swearing of the automod.
     */
    public swearing: number

    /**
     * @description The level of ethnicity and religion terms of the automod.
     */
    public ethnicityOrReligion: number

    /**
     * @description The level of sex based terms of the automod.
     */
    public sexBasedTerms: number

    /**
     * 
     * @param chatbot 
     * @param data 
     * @param channel 
     */
    public constructor(chatbot: ChatBot, data: AutoModSettingsData, channel: Channel) {
        this.chatbot = chatbot
        this.channel = channel
        this.overallLevel = data.overall_level
        this.disability = data.disability
        this.aggression = data.aggression
        this.sexOrGen = data.sexuality_sex_or_gender
        this.misogyny = data.misogyny
        this.bullying = data.bullying
        this.swearing = data.swearing
        this.ethnicityOrReligion = data.race_ethnicity_or_religion
        this.sexBasedTerms = data.sex_based_terms
    }

    /**
     * Set multiples options of the automod.
     * @param {AutoModSettingsOptions} options The options that contains all the terms of the automod.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async set(options: AutoModSettingsOptions) {

        const body = new AutoModSettingsBody({ ...this, ...options })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.overallLevel = options.overallLevel
        this.disability = options.disability
        this.aggression = options.aggression
        this.sexOrGen = options.sexOrGen
        this.misogyny = options.misogyny
        this.bullying = options.bullying
        this.swearing = options.swearing
        this.ethnicityOrReligion = options.ethnicityOrReligion
        this.sexBasedTerms = options.sexBasedTerms

        return settings
    }

    /**
     * Set the overallLevel of the automod.
     * @param {number} value The value of the overallLevel from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setOverallLevel(value: number) {

        const body = new AutoModSettingsBody({ overallLevel: value })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.overallLevel = value

        return settings
    }

    /**
     * Set the disability level of the automod.
     * @param {number} value The value of the disability level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setDisability(value: number) {

        const body = new AutoModSettingsBody({ ...this, disability: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.disability = value

        return settings
    }

    /**
     * Set the agression level of the automod.
     * @param {number} value The value of the agression level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setAggression(value: number) {

        const body = new AutoModSettingsBody({ ...this, aggression: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.aggression = value

        return settings
    }

    /**
     * Set the sex or gender level of the automod.
     * @param {number} value The value of the sex or gender level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setSexOrGen(value: number) {

        const body = new AutoModSettingsBody({ ...this, sexOrGen: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.sexOrGen = value

        return settings

    }


    /**
     * Set the misogyny level of the automod.
     * @param {number} value The value of the overallLevel from 0 to 4.
     * @returns {Promise<AutoModSettings>} Retruns the new automod settings.
     */
    public async setMisogyny(value: number) {

        const body = new AutoModSettingsBody({ ...this, misogyny: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.misogyny = value

        return settings
    }

    /**
     * Set the bullying level of the automod.
     * @param {number} value The value of the bullying level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setBullying(value: number) {

        const body = new AutoModSettingsBody({ ...this, bullying: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.bullying = value

        return settings
    }

    /**
     * Set the swearing level of the automod.
     * @param {number} value The value of the swearing level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setSwearing(value: number) {

        const body = new AutoModSettingsBody({ ...this, swearing: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.swearing = value

        return settings

    }


    /**
     * Set the ethnicity and religion level of the automod.
     * @param {number} value The value of the ethnicity and religion level from 0 to 4.
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setEthnicityOrReligion(value: number) {

        const body = new AutoModSettingsBody({ ...this, ethnicityOrReligion: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.ethnicityOrReligion = value

        return settings

    }



    /**
     * Set the sex based terms levels of the automod.
     * @param {number} value The value of the sex based terms level from 0 to 4. 
     * @returns {Promise<AutoModSettings>} Returns the new automod settings.
     */
    public async setSexBasedTerms(value: number) {

        const body = new AutoModSettingsBody({ ...this, sexBasedTerms: value, overallLevel: null })

        const settings = new AutoModSettings(this.chatbot, await this.chatbot.helixClient.updateAutoModSettings(this.channel.id, this.chatbot.user.id, body), this.channel)

        this.sexBasedTerms = value

        return settings
    }

}
