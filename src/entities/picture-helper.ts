import { md5 } from "../helpers";
import { parse } from "url";
import { Picture } from "./picture";

export type PictureBuildParams = {
    hash: string
    url: string
}

export class PictureHelper {
    static createId(hash: string) {
        return md5(hash.trim());
    }

    static build({ hash, url }: PictureBuildParams) {
        const parsedUrl = parse(url);
        if (!parsedUrl.hostname) {
            throw new Error(`Invalid url: ${url}`);
        }
        const host = parsedUrl.hostname;
        const id = PictureHelper.createId(hash);
        const createdAt = new Date().toISOString();

        const item: Picture = {
            id,
            host,
            hash,
            url,
            createdAt,
        }

        return item;
    }
}
