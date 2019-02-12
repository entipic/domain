import { Repository } from "./repository";
import { UniqueName } from "../entities";

export interface UniqueNameRepository extends Repository<UniqueName> {
    countTotal(): Promise<number>
}
