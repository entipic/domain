import { Repository, RepositoryAccessOptions } from "./repository";
import { UnknownName } from "../entities/unknown-name";

export interface UnknownNamesListParams {
  limit: number;
}

export interface UnknownNameRepository extends Repository<UnknownName> {
  oldest(
    params: UnknownNamesListParams,
    options?: RepositoryAccessOptions<UnknownName>
  ): Promise<UnknownName[]>;
}
