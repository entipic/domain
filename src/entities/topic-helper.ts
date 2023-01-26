import shortid = require("shortid");
import { TopicType, Topic } from "./topic";
import { clearText, atonic, uniq } from "../helpers";

export type TopicBuildParams = {
  name: string;
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

  popularity?: number;
};

export class TopicHelper {
  static newId() {
    return shortid();
  }

  static build(params: TopicBuildParams) {
    const name = params.name.trim();
    const lang = params.lang.trim().toLowerCase();

    const createdAt = new Date().toISOString();
    const slug = TopicHelper.slug(name, lang);
    const id = TopicHelper.newId();

    const pictureId = params.pictureId.trim();
    const pictureHost = params.pictureHost.trim();
    const picturesIds = uniq(params.picturesIds || [pictureId]);

    const refIP = params.refIP;

    const item: Topic = {
      id,
      name,
      lang,
      slug,
      createdAt,
      pictureId,
      pictureHost,
      picturesIds,
      refIP,
      popularity: params.popularity || 0
    };

    if (params.refHost) {
      item.refHost = params.refHost.trim();
    }
    if (params.wikiPageId) {
      item.wikiPageId = params.wikiPageId;
    }
    if (params.wikiPageTitle) {
      item.wikiPageTitle = params.wikiPageTitle.trim();
    }

    if (params.description) {
      item.description = params.description.trim();
    }
    if (params.type) {
      item.type = params.type;
    }

    return item;
  }

  static slug(name: string, lang: string) {
    const sname = lang === "en" ? name : `${name}-${lang}`;
    return TopicHelper.uniqueName(sname).replace(/\s+/g, "-");
  }

  static uniqueName(name: string) {
    return clearText(atonic(name.trim().toLowerCase()));
  }
}
