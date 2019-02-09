import { clearText, atonic, md5 } from "../helpers";
import { UniqueName } from "./unique-name";

export type UniqueNameBuildParams = {
    name: string
    lang: string
    country?: string

    wikiPageId?: number
    wikiPageTitle?: string

    pictureId: string
    topicId: string

    popularity?: number
}

export class UniqueNameHelper {
    static createUniqueName(name: string) {
        name = atonic(name.trim().toLowerCase());
        name = clearText(name);

        return name;
    }

    static createId({ name, lang, country }: { name: string, lang: string, country?: string }) {
        const uniqueName = UniqueNameHelper.createUniqueName(name);

        return md5([lang, country || '_', uniqueName].join('|'));
    }

    static build(params: UniqueNameBuildParams) {
        const name = params.name.trim();
        const lang = params.lang.trim().toLowerCase();
        const date = new Date();
        const createdAt = date.toISOString();
        const uniqueName = UniqueNameHelper.createUniqueName(name);
        const id = UniqueNameHelper.createId(params);
        const pictureId = params.pictureId.trim();
        const entityId = params.topicId.trim();

        const item: UniqueName = {
            id,
            name,
            lang,
            uniqueName,
            createdAt,
            topicId: entityId,
            pictureId,
            popularity: params.popularity || 0,
        };

        if (params.country) {
            item.country = params.country.trim();
        }
        if (params.wikiPageId) {
            item.wikiPageId = params.wikiPageId;
        }
        if (params.wikiPageTitle) {
            item.wikiPageTitle = params.wikiPageTitle.trim();
        }

        return item;
    }
}
