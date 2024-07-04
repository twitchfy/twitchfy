export interface InitDeviceFlowOptions<T extends boolean = boolean> {
    clientId?: string
    scopes?: string[]
    raw?: T
}