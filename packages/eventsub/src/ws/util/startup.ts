import type { WebSocketConnection} from '../structures';
import { WebSocketSubscription } from '../structures';
import { Events } from '../../enums';
import { SubscriptionVersionsObject } from '../../util';

export async function startup(connection: WebSocketConnection) {

  if (connection.maintainSubscriptions) {

    for (const data of await connection.storage.getAll()) {

      const subscriptionData = await connection.helixClient.subscribeToEventSub({ type: data.type, condition: data.options, transport: { method: 'websocket', session_id: connection.sessionID }, version: SubscriptionVersionsObject[data.type] }, { useTokenType: 'user' });

      const subscription = new WebSocketSubscription<typeof data.type>(connection, data, subscriptionData);

      await connection.storage.delete(data.id);

      await connection.storage.set(subscription.id, subscription);

      connection.subscriptions.set(subscription.id, subscription);

      connection.makeDebug(`Created subscription as it was reloaded in websockets (they can only be created) (${subscription.type}) ${subscription.id}`);

      connection.emit(Events.SubscriptionReload, subscription);

    }
  }
}