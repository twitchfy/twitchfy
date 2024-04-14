import type { OptionsRecord } from './OptionsRecord';
import type { BaseUser, NumberOption, StringOption, BooleanOption, MentionOption, Collection } from '../structures';
import type { EventSubConnection } from '../enums';

/**
 * Auxiliary type to define the options of a command.
 */
export type CommandOptionsAux<T extends EventSubConnection, K> = K extends OptionsRecord
  ? { [U in keyof K]:
        K[U] extends NumberOption<infer V> ? number | V:
        K[U] extends StringOption<infer V> ? string | V:
        K[U] extends BooleanOption<infer V> ? boolean | V :
        K[U] extends MentionOption<null, infer V> ? V extends true? Collection<T, BaseUser<T>> | null : BaseUser<T> | null :
        string | number | boolean | BaseUser<T> | Collection<T, BaseUser<T>> | null
    }
  : T;