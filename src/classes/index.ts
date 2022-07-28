import { IAssetValue } from "@interface";

export class CountrySelector {
    image?: string;
    name?: string;
    en_name?: string;
    code?: string;
    constructor(image?: string, name?: string, en_name?: string, code?: string) {
      this.image = image;
      this.name = name;
      this.en_name = en_name;
      this.code = code;
    }
  }

// description: asset value object class //
export class AssetValue implements IAssetValue {
  electrified: string;
  classification: string;
  sequence: number;
  image_url: Array<string>;
  video_url: string;
  
  constructor(electrified: string, classification: string, sequence: number, image_url: Array<string>, video_url: string) {
    this.electrified = electrified;
    this.classification = classification;
    this.sequence = sequence;
    this.image_url = image_url;
    this.video_url = video_url;
  }
}

export class VideoURL {
  video: string;
  video_url: string;

  constructor(video: string, video_url: string) {
    this.video = video;
    this.video_url = video_url;
  }
}
