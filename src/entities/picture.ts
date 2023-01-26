import Joi from "joi";
import { JoiEntityValidator } from "../entity-validator";

export type Picture = {
  id: string;

  hash: string;
  url: string;
  host: string;

  createdAt: string;
};

export class PictureValidator extends JoiEntityValidator<Picture> {
  constructor() {
    super({ createSchema, updateSchema });
  }
}

const schema = {
  id: Joi.string().regex(/^[a-z0-9]{32}$/),
  hash: Joi.string().min(16).max(32),
  url: Joi.string().min(10).max(800).trim(),
  host: Joi.string().min(4).max(50).trim(),
  createdAt: Joi.date().iso().raw()
};

const createSchema = Joi.object()
  .keys({
    id: schema.id.required(),
    hash: schema.hash.required(),
    url: schema.url.required(),
    host: schema.host.required(),

    createdAt: schema.createdAt.required()
  })
  .required();

const updateSchema = Joi.object()
  .keys({
    id: schema.id.required(),
    set: Joi.object().keys({}),
    delete: Joi.array().allow()
  })
  .or("set", "delete")
  .required();
