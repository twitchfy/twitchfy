import type { BooleanOption, MentionOption, NumberOption, StringOption } from '../structures';

/**
 * The options object of a command.
 */
export type OptionsRecord = Record<string, StringOption<string | null> | NumberOption<number | null> | BooleanOption<boolean | null> | MentionOption<null, boolean>>;