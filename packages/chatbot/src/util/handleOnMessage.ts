/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { ChannelChatMessageMessage } from '@twitchapi/eventsub';
import { resolvePermissions } from './resolvePermissions';
import { optionsParser } from './optionsParser';
import type { EventSubConnection } from '../enums';
import { TwitchContext, type ChatBot } from '../structures';
import type { EventSubConnectionMap } from '../interfaces';


/**
 * Handle the message received from the chat.
 * @param this The current instance of the chatbot.
 * @param data The message received from the chat.
 * @internal
 */
export async function handleOnMessage<T extends EventSubConnection>(this: ChatBot<T>, data: ChannelChatMessageMessage<EventSubConnectionMap[T]>){

  if(this.userID === data.chatter.id) return;

  const content = data.message.content;

  // @ts-expect-error

  const prefix = this.__prefix(new CommandContext<{}, T>(this, { ...data })).find((x) => content.startsWith(x));

  if(!prefix) return;

  const mentionAtStart = data.message.reply && data.message.fragments[0].type === 'mention' ? data.message.fragments[0] : null;

  const args = content.slice(mentionAtStart? mentionAtStart.content.length + 1 + prefix.length: prefix.length).replace('\u{E0000}', ' ').trim().split(/ +/g);

  const commandName = args.shift();

  const command = this.commands.get(commandName!);

  if(!command) return;

  const options = optionsParser<T>(this, args.join(' '), command.options, data, this.optionOperator);

  Object.keys(options).filter((x) => !command.options[x]).map((x) => delete options[x]);

  const context = new TwitchContext<typeof command.options, T>(this, { ...data, prefix, commandName: commandName!, options });

  if(command.permissions){

    const result = await resolvePermissions<T>(command.permissions, context);

    if(!result.passed && command.onPermissionFallback){
      return await command.onPermissionFallback(context, result.requiredPerms!);
    }else if(!result.passed){
      return;
    }
  }

  
  await command.run!(context);

}