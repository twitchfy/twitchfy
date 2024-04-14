import type { CommandHandler, EventHandler } from '../structures';

/**
 * Represent the handlers of the chatbot.
 * @internal
 */
export interface Handlers {
    commands: CommandHandler
    events: EventHandler
}