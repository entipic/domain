import Joi from "joi";
import { JoiEntityValidator } from "../entity-validator";

export type TopicType = "PERSON" | "PLACE" | "ORG" | "EVENT" | "PRODUCT";

export type Topic = {
  id: string;
  name: string;
  slug: string;

  lang: string;

  type?: TopicType;

  wikiPageId?: number;
  wikiPageTitle?: string;
  description?: string;

  pictureId: string;
  pictureHost: string;

  refIP: string;
  refHost?: string;

  picturesIds?: string[];

  popularity: number;

  createdAt: string;
};

export class TopicValidator extends JoiEntityValidator<Topic> {
  constructor() {
    super({ createSchema, updateSchema });
  }
}

const schema = {
  id: Joi.string().regex(/^[a-zA-Z0-9_-]{7,16}$/),
  name: Joi.string().min(2).max(200),
  slug: Joi.string().min(2).max(200),
  lang: Joi.string().regex(/^[a-z]{2}$/),

  type: Joi.string().allow(["PERSON", "PLACE", "ORG", "EVENT", "PRODUCT"]),

  wikiPageId: Joi.number().integer().min(1),
  wikiPageTitle: Joi.string().min(2).max(200),
  refIP: Joi.string().min(5).max(100),
  refHost: Joi.string().min(5).max(100),
  pictureId: Joi.string().regex(/^[a-z0-9]{32}$/),
  pictureHost: Joi.string().min(4).max(100),

  picturesIds: Joi.array()
    .items(Joi.string().regex(/^[a-z0-9]{32}$/))
    .unique()
    .min(1)
    .max(10),

  popularity: Joi.number().integer().min(0),
  description: Joi.string().trim().max(250).truncate(),

  createdAt: Joi.date().iso().raw()
};

const createSchema = Joi.object()
  .keys({
    id: schema.id.required(),
    name: schema.name.required(),
    slug: schema.slug.required(),
    lang: schema.lang.required(),

    type: schema.type,

    wikiPageId: schema.wikiPageId,
    wikiPageTitle: schema.wikiPageTitle,
    refIP: schema.refIP.required(),
    refHost: schema.refHost,
    pictureId: schema.pictureId.required(),
    pictureHost: schema.pictureHost.required(),

    picturesIds: schema.picturesIds.required(),

    popularity: schema.popularity.required(),
    description: schema.description,

    createdAt: schema.createdAt.required()
  })
  .required();

const updateSchema = Joi.object()
  .keys({
    id: schema.id.required(),
    set: Joi.object().keys({
      type: schema.type,

      wikiPageId: schema.wikiPageId,
      wikiPageTitle: schema.wikiPageTitle,
      pictureId: schema.pictureId,
      pictureHost: schema.pictureHost,

      picturesIds: schema.picturesIds,
      description: schema.description,
      popularity: schema.popularity
    }),
    delete: Joi.array().allow(["type"])
  })
  .or("set", "delete")
  .required();
