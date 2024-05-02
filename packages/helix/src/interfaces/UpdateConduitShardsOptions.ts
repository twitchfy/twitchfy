export interface UpdateConduitShardsOptions {
    conduitId: string
    shards: UpdateConduitShards[]
}

export interface UpdateConduitShards {
    id: string
    transport: UpdateConduitTransport
}

export interface UpdateConduitTransport {
    method: 'webhook' | 'websocket'
    callback?: string
    secret?: string
    session_id?: string
}