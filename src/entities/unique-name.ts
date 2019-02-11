import * as Joi from 'joi';
import { JoiEntityValidator } from '../entity-validator';

export type UniqueName = {
    id: string
    lang: string
    country?: string
    name: string
    uniqueName: string

    pictureId: string
    topicId: string

    createdAt: string
}

export class UniqueNameValidator extends JoiEntityValidator<UniqueName>{
    constructor() {
        super({ createSchema, updateSchema })
    }
}


const schema = {
    id: Joi.string().regex(/^[a-z0-9]{32}$/),
    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),
    name: Joi.string().min(2).max(200).trim(),
    uniqueName: Joi.string().min(2).max(200).trim(),

    pictureId: Joi.string().regex(/^[a-z0-9]{32}$/),
    topicId: Joi.string().regex(/^[a-zA-Z0-9_-]{2,16}$/),

    createdAt: Joi.date().iso().raw(),
}

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    lang: schema.lang.required(),
    country: schema.country,
    name: schema.name.required(),
    uniqueName: schema.uniqueName.required(),

    pictureId: schema.pictureId.required(),
    topicId: schema.topicId.required(),

    createdAt: schema.createdAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        pictureId: schema.pictureId,
        topicId: schema.topicId,
    }),
    delete: Joi.array().valid(),
}).or('set', 'delete').required();
