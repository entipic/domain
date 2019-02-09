import * as Joi from 'joi';
import { JoiEntityValidator } from '../entity-validator';

export type UnknownName = {
    id: string
    lang: string
    country?: string
    name: string
    uniqueName: string

    refIP: string
    refHost?: string

    createdAt: string
    expiresAt: number
}

export class UnknownNameValidator extends JoiEntityValidator<UnknownName>{
    constructor() {
        super({ createSchema, updateSchema })
    }
}


const schema = {
    id: Joi.string().regex(/^[a-z0-9_-]{32}$/),
    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),
    name: Joi.string().min(2).max(200).trim(),
    uniqueName: Joi.string().min(2).max(200).trim(),
    refIP: Joi.string().min(5).max(100).trim(),
    refHost: Joi.string().min(4).max(100).trim(),

    createdAt: Joi.date().iso().raw(),
    expiresAt: Joi.date().timestamp('unix').raw(),
}

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    lang: schema.lang.required(),
    country: schema.country,
    name: schema.name.required(),
    uniqueName: schema.uniqueName.required(),
    refIP: schema.refIP.required(),
    refHost: schema.refHost,

    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({}),
    delete: Joi.array().valid(),
}).or('set', 'delete').required();
