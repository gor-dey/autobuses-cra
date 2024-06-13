export interface TransportLocation {
    id: number
    direction: number
    actual_lat: string
    actual_lng: string
    updated_time: string
    route: TransportLocationRoute
}

export interface TransportLocationRoute {
    transport_id: number
    gos_num: string
    repair: number
    name: string
}