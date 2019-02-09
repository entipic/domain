import { clearText, atonic, md5, unixTime } from "../helpers";
import ms = require("ms");
import { UnknownName } from "./unknown-name";

export type UnknownNameBuildParams = {
    name: string
    lang: string
    country?: string
    refIP: string
    refHost?: string
}

export class UnknownNameHelper {
    static createUniqueName(name: string) {
        name = atonic(name.trim().toLowerCase());
        name = clearText(name);

        return name;
    }

    static createId({ name, lang, country }: { name: string, lang: string, country?: string }) {
        const uniqueName = UnknownNameHelper.createUniqueName(name);

        return md5([lang, country || '', uniqueName].join('|'));
    }

    static expiresAt(date?: Date) {
        date = date || new Date();
        return unixTime(new Date(date.getTime() + ms('7d')));
    }

    static build(params: UnknownNameBuildParams) {
        const name = params.name.trim();
        const lang = params.lang.trim().toLowerCase();
        const date = new Date();
        const createdAt = date.toISOString();
        const expiresAt = UnknownNameHelper.expiresAt(date);
        const uniqueName = UnknownNameHelper.createUniqueName(name);
        const id = UnknownNameHelper.createId(params);
        const refIP = params.refIP.trim();

        const item: UnknownName = {
            id,
            name,
            lang,
            uniqueName,
            createdAt,
            expiresAt,
            refIP,
        }

        if (params.country) {
            item.country = params.country.trim();
        }
        if (params.refHost) {
            item.refHost = params.refHost.trim();
        }

        return item;
    }
}
