import * as Joi from 'joi';
import { JoiEntityValidator } from '../entity-validator';

export type EntityType = 'PERSON' | 'PLACE' | 'ORG' | 'EVENT' | 'PRODUCT';

export type Entity = {
    id: string
    name: string
    slug: string

    lang: string

    type?: EntityType

    wikiPageId?: number
    wikiPageTitle?: string
    description?: string

    pictureId: string
    pictureHost: string

    refIP: string
    refHost?: string

    picturesIds?: string[]

    popularity: number

    createdAt: string
}

export class EntityValidator extends JoiEntityValidator<Entity>{
    constructor() {
        super({ createSchema, updateSchema })
    }
}


const schema = {
    id: Joi.string().regex(/^[a-zA-Z0-9_-]{16}$/),
    name: Joi.string().min(2).max(200),
    slug: Joi.string().min(2).max(200),
    lang: Joi.string().regex(/^[a-z]{2}$/),

    type: Joi.string().valid(['PERSON', 'PLACE', 'ORG', 'EVENT', 'PRODUCT']),

    wikiPageId: Joi.number().integer().min(1),
    wikiPageTitle: Joi.string().min(2).max(200),
    refIP: Joi.string().min(5).max(100),
    refHost: Joi.string().min(5).max(100),
    pictureId: Joi.string().regex(/^[a-z0-9]{32}$/),
    pictureHost: Joi.string().min(4).max(100),

    picturesIds: Joi.array().items(Joi.string().regex(/^[a-z0-9]{32}$/)).unique().min(1).max(10),

    createdAt: Joi.date().iso().raw(),
}

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    name: schema.name.required(),
    slug: schema.slug.required(),
    lang: schema.lang.required(),

    type: schema.type.required(),

    wikiPageId: schema.wikiPageId.required(),
    wikiPageTitle: schema.wikiPageTitle.required(),
    refIP: schema.refIP.required(),
    refHost: schema.refHost.required(),
    pictureId: schema.pictureId.required(),
    pictureHost: schema.pictureHost.required(),

    picturesIds: schema.picturesIds.required(),

    createdAt: schema.createdAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        type: schema.type,

        wikiPageId: schema.wikiPageId,
        wikiPageTitle: schema.wikiPageTitle,
        pictureId: schema.pictureId,
        pictureHost: schema.pictureHost,

        picturesIds: schema.picturesIds,
    }),
    delete: Joi.array().valid(['type']),
}).or('set', 'delete').required();
