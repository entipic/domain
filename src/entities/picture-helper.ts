import { parse } from "url";
import { md5 } from "../helpers";
import { Picture } from "./picture";

export type PictureBuildParams = {
  hash: string;
  url: string;
  host?: string;
};

export class PictureHelper {
  static createId(hash: string) {
    return md5(hash.trim());
  }

  static build({ hash, url, host }: PictureBuildParams) {
    if (!host) {
      const parsedUrl = parse(url);
      if (!parsedUrl.hostname) {
        throw new Error(`Invalid url: ${url}`);
      }
      host = parsedUrl.hostname;
    }
    const id = PictureHelper.createId(hash);
    const createdAt = new Date().toISOString();

    const item: Picture = {
      id,
      host,
      hash,
      url,
      createdAt
    };

    return item;
  }

  static formatS3Url(pictureId: string) {
    const size: PictureSizeName = "f";
    return `https://s3.eu-central-1.amazonaws.com/cdn.entipic.com/${pictureId.substr(
      0,
      3
    )}/${size}/${pictureId}.jpg`;
  }

  static formatS3Key(pictureId: string) {
    const size: PictureSizeName = "f";
    return `${pictureId.substr(0, 3)}/${size}/${pictureId}.jpg`;
  }

  static getPictureSize(sizeName: PictureSizeName) {
    return PICTURE_SIZES[sizeName];
  }
}

export type PictureSizeName = "x" | "a" | "b" | "c" | "d" | "e" | "f";

const PICTURE_SIZES = {
  x: 25,
  a: 50,
  b: 100,
  c: 150,
  d: 200,
  e: 250,
  f: 300
};
