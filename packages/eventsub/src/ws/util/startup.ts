import type { WebSocketConnection } from '../structures';
import { WebSocketSubscription } from '../structures';
import { Events } from '../../enums';
import { SubscriptionVersionsObject } from '../../util';

/**
 * Used to start up the connection and reload subscriptions if the maintainSubscriptions option is enabled.
 * @param this The WebSocket connection.
 */
export async function startup(this: WebSocketConnection) {

  if (this.maintainSubscriptions) {

    for (const data of await this.storage.getAll()) {

      const subscriptionData = await this.helixClient.subscribeToEventSub({ type: data.type, condition: data.options, transport: { method: 'websocket', session_id: this.sessionId }, version: SubscriptionVersionsObject[data.type] }, { useTokenType: 'user' });

      const subscription = new WebSocketSubscription<typeof data.type>(this, data, subscriptionData);

      await this.storage.delete(data.id);

      await this.storage.set(subscription.id, subscription);

      this.subscriptions.set(subscription.id, subscription);

      this.makeDebug(`Created subscription as it was reloaded in websockets (they can only be created) (${subscription.type}) ${subscription.id}`);

      this.emit(Events.SubscriptionReload, subscription);

    }
  }
}