/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { ChannelChatMessageMessage } from '@twitchfy/eventsub';
import type { EventSubConnectionMap } from '../interfaces';
import type { EventSubConnection } from '../enums';
import type { CommandOptionsAux, OptionsRecord } from '../types';
import type { ChatBot, MentionOption } from '../structures';
import { BaseUser, Collection } from '../structures';

/**
 * Parses the options of a command.
 * @param chatbot The current instance of the chatbot.
 * @param content The content of the message.
 * @param options The options of the command.
 * @param data The data of the message.
 * @param operator The operator of the command.
 * @returns The parsed options.
 * @internal
 */
export function optionsParser<T extends EventSubConnection>(chatbot: ChatBot<T>, content: string, options: OptionsRecord, data: ChannelChatMessageMessage<EventSubConnectionMap[T]>, operator: string) {

  function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const args: Record<string, string> = {};
  let lastOption: string | null = null;

  const regex = new RegExp(
    `(${escapeRegExp(operator)}[^${escapeRegExp(
      operator
    )}\\s]+(?:\\s(?:[^\\s${escapeRegExp(operator)}]+\\s?)+)?)`,
    'g'
  );
  let match;
  while ((match = regex.exec(content)) !== null) {
    const arg = match[1];
    const [key, ...values] = arg.split(/\s+/);
    const value = values.join(' ').trim();
    const optionKey = key.slice(1);

    if (optionKey in options || Object.keys(args).some((existingKey) => optionKey.startsWith(existingKey))) {
      
      if(options[optionKey].type === 'boolean' && value === ''){
        // @ts-expect-error
        args[optionKey] = true;
      }else {
      // @ts-expect-error
        args[optionKey] = value !== '' ? value : null;
        lastOption = optionKey;
      }
    } else if (lastOption) {
      args[lastOption] += ` ${key}`;
    }
  }

  for (const i of Object.keys(options)) {
    if (((typeof options[i].defaultValue === 'boolean' && options[i].type === 'boolean') || options[i].defaultValue) && !args[i]) {
      // @ts-expect-error
      args[i] = options[i].defaultValue;

      continue;
    } else if (!args[i]) {
      // @ts-expect-error
      args[i] = null;

      continue;
    }

    switch (options[i].type) {
    // @ts-expect-error
    case 'number': args[i] = Number(args[i]); break;
      // @ts-expect-error
    case 'boolean': args[i] = typeof args[i] === 'boolean' ? args[i] : args[i] === 'true' ? true : args[i] === 'false' ? false : null; break;

    case 'mention': {

      if((options[i] as MentionOption).grouped){

        const mentions = new Collection<string, BaseUser<T>>();

        for(const possibleMention of args[i].split(' ')){
          const mention = data.message.fragments.find((x) => x.type === 'mention' && x.content === possibleMention)?.mention;
          if(!mention) continue;
          mentions.set(mention.user.id, new BaseUser<T>(chatbot, { ...mention.user, display_name: mention.user.displayName }));
        }

        // @ts-expect-error

        args[i] = mentions.size ? mentions : null;

      } else {

        const mention = data.message.fragments.find((x) => x.type === 'mention' && x.content === args[i])?.mention;

        if (!mention){
        // @ts-expect-error
          args[i] = null;

          continue;
        }

        // @ts-expect-error

        args[i] = new BaseUser<T>(chatbot, { ...mention!.user, display_name: mention!.displayName });

      }

    }

      break;
    }
  }

  return args as CommandOptionsAux<T, typeof options>;


}