//        class (common)        //
export class DataForm {
  setting: Setting;
  translations: Translation[];

  constructor(setting: Setting, translations: Translation[]) {
    this.setting = setting;
    this.translations = translations;
  }
}
//        class (common)        //

//        interface (common)        //
export interface Setting {
  app_id: string;
  app_version: number;
  app_type: string;
  nation: string;
  languages: string[];
  default_language: string;
  electrified_version: number,
  translation_version: number,
  displayable_electrifies: Array<string>;
}

export interface Translation {
  language: string;
  version: number;
  electrifies: Electrified[];
  // todo powertrain, connectivity
}

export interface Electrified {
  electrified_item_name: string;
  electrified_subtitle: string;
  version: number;
  main_image: string;
  rotation_image: string;
  calculation_image: string;
  calculator: number;
  main?: Template_3;
  highlights?: Array<Template_1 | Template_2 | Template_3>;
  charging?: Array<Template_1 | Template_2 | Template_3>;
  benefits?: Array<Template_1 | Template_2 | Template_3>;
}

export interface Template_1 {
  sequence_number: number;
  type: string;
  translation_status: boolean;
  title: string;
  comment: string;
  description: string;
  image: string;
  video: string | null;
  video_image: string;
}

export interface Template_2 {
  sequence_number: number;
  type: string;
  contents: Template_2_item[];
}

export interface Template_2_item {
  translation_status: boolean;
  image: string;
  comment: string;
  description: string;
}

export interface Template_3 {
  sequence_number: number;
  type: string;
  image: string;
}
//        interface (common)        //

//        interface (front global)        //
export interface ChangePageArgument {
  page_class: string;
  electrified_index: number;
  current_page: number;
  electrifies: Electrified[];
}

export interface ElectrifiedPageStoreArgument {
  electrified_index: number;
  electrifies?: Electrified[];
}
//        interface (front global)        //

//        interface (common)        //
export interface IAssetValue {
  electrified: string;
  classification: string;
  sequence: number;
  image_url: Array<string>;
  video_url: string;
}
//        interface (common)        //
