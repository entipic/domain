import { BaseEntity } from "./entities/base";
import { RepositoryUpdateData } from "./repositories/repository";
import Joi from "joi";

export interface IEntityValidator<T extends BaseEntity> {
  onCreate(data: T): T;
  onUpdate(data: RepositoryUpdateData<T>): RepositoryUpdateData<T>;
}

export interface IEntityValidatorOptions {
  createSchema: any;
  updateSchema: any;
}

export class JoiEntityValidator<T extends BaseEntity>
  implements IEntityValidator<T>
{
  constructor(private options: IEntityValidatorOptions) {}

  onCreate(data: T) {
    const result = validateSchema(this.options.createSchema, data);
    if (result.error) {
      throw result.error;
    }
    return result.value;
  }
  onUpdate(data: RepositoryUpdateData<T>) {
    const result = validateSchema(this.options.updateSchema, data);
    if (result.error) {
      throw result.error;
    }
    return result.value;
  }
}

function validateSchema<T>(schema: Joi.AnySchema, data: T) {
  return schema.validate(data, {
    allowUnknown: false,
    abortEarly: true,
    convert: true,
    noDefaults: false,
    presence: "optional",
    stripUnknown: false,
    skipFunctions: false
  });
}
