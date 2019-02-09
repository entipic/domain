import { BaseEntity, BaseEntityId } from "./entities";


export interface RepositoryAccessOptions<T extends BaseEntity> {
    /**
     * Entity fields to return
     */
    fields?: (keyof T)[]
}

export interface RepositoryUpdateData<T extends BaseEntity> {
    /**
     * Entity id to updated
     */
    id: BaseEntityId
    /**
     * Entity fields to updated
     */
    set?: Partial<T>
    /**
     * Entity fields to delete
     */
    delete?: (keyof T)[]
}

export interface Repository<T extends BaseEntity> {
    /**
     * Delete an entity by id.
     * @param id Entity id to be deleted
     */
    delete(id: BaseEntityId): Promise<boolean>
    /**
     * Create a new entity.
     * @param data Entity data
     */
    create(data: T): Promise<T>
    /**
     * Update an entity.
     * @param data Entity update data
     */
    update(data: RepositoryUpdateData<T>): Promise<T>

    /**
     * Get an entity by id.
     * @param id Entity id
     * @param options Entity access options
     */
    getById(id: BaseEntityId, options?: RepositoryAccessOptions<T>): Promise<T | null>
    /**
     * Get entities by ids
     * @param ids Entities ids
     * @param options Entity access options
     */
    getByIds(ids: BaseEntityId[], options?: RepositoryAccessOptions<T>): Promise<T[]>
    /**
     * Check if an entity exists or not.
     * @param id Entity id
     */
    exists(id: BaseEntityId): Promise<boolean>

    /** Deletes all tables or files associated with this repository */
    deleteStorage(): Promise<void>
    /** Creates tables or files associated with this repository */
    createStorage(): Promise<void>
}
