import type { TokenAdapter } from '../structures';

export type UserTokenAdapter<K extends boolean = true> = TokenAdapter<'code' | 'implicit' | 'device', K>