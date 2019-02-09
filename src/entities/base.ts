export interface Dictionary<V> {
    [key: string]: V
}

export type BaseEntityId = string;

export interface BaseEntity {
    id: BaseEntityId
}
