import {
  APP_VERSION,
  ARRAY_BUFFER,
  BENEFITS,
  CALCULATION,
  CHARGING,
  ELECTRIFIED_INITIALIZE_URL,
  ELECTRIFIED_MAIN,
  ELECTRIFIED_VERSION_CHECK_URL,
  HIGHLIGHTS,
  IMAGE_JPEG,
  IMAGE_PNG,
  JPEG,
  MP4,
  PNG,
  ROTATION,
  SELECTOR,
  TEMPLATE_1,
  TEMPLATE_2,
  TEMPLATE_3,
  TRANSLATION_VERSION_CHECK_URL,
  VIDEO_MP4,
} from "src/constants";

import { v4 as uuidv4 } from "uuid";
import * as JSZip from "jszip";
import axios from "axios";
import * as fs from "@tauri-apps/api/fs";
import { IAssetValue, Electrified, Template_3, Template_1, Template_2, IVideoURL } from "@interface";
import { VideoURL } from "@class";

// description: Response로 받은 파일 압축 해제 처리
export const unzip = (data: any) => {
  // description: blob file 생성
  const blob_file = new Blob([data], { type: "application/octet-stream" });
  // description: blob file 압축 해제
  JSZip.loadAsync(blob_file).then(
    async (zip) => await decompressionByType(zip)
  );
};

// description: 타입별 압축 해제 처리 //
export const decompressionByType = async (zip: JSZip) => {
  // description: 압축 파일 반복 접근 //
  Object.keys(zip.files).forEach(async function (file_name) {
    // description: data.json 파일 일 때 //
    if (file_name === "data.json") {
      // description: 문자열로 파일 압축 해제 //
      const content = await zip.files[file_name].async("string");
      // description: 문자열 파일 쓰기 //
      await fs.writeFile(file_name, content, {
        dir: fs.BaseDirectory.Document,
      });
    }
    // description: data.json 파일이 아닐 때 //
    else {
      // description: 폴더 일 때 //
      if (zip.files[file_name].dir) {
        try {
          // description: 폴더가 존재하는지 check //
          await fs.readDir(`${file_name}`, { dir: fs.BaseDirectory.Document });
        } catch (e) {
          // description: 폴더가 존재하지 않는다면 폴더 생성 //
          await fs.createDir(`${file_name}`, {
            dir: fs.BaseDirectory.Document,
          });
        }
      }
      // description: 이미지 파일일 때 //
      else {
        const content = await zip.files[file_name].async("uint8array");
        await fs.writeBinaryFile(`${file_name}`, content, {
          dir: fs.BaseDirectory.Document,
        });
      }
    }
  });
};

// description: setting data 불러오기 //
export const DATA = async () => {
  try {
    const data_file = await fs.readTextFile(`data.json`, {
      dir: fs.BaseDirectory.Document,
    });
    return JSON.parse(data_file);
  } catch (e: any) {
    console.log(`DATA read error ${e.message}`);
    return {
      app_id: "",
      app_version: APP_VERSION,
      app_type: "ELECTRIFIED",
      nation: "",
      electrified_version: -1,
      translation_version: -1,
      languages: [],
      default_language: "",
    };
  }
};

// description: resource binary file 불러오기 //
export const resourceURL = async (
  selected_electrified: string,
  resource: string
) => {
  return await fs.readBinaryFile(`${selected_electrified}/${resource}`, {
    dir: fs.BaseDirectory.Document,
  });
};

// todo: 삭제 할 함수 //
export const imageURL = async (selected_electrified: string, image: string) => {
  return await fs.readBinaryFile(`${selected_electrified}/${image}`, {
    dir: fs.BaseDirectory.Document,
  });
};

// description: 해당 언어에 맞는 언어 표현 //
export const LANGUAGE = (language: string) => {
  if (language === "ar-XA") return "عربى";
  if (language === "bg") return "БЪЛГАРСКИ";
  if (language === "hr") return "Hrvatski";
  if (language === "cs") return "čech";
  if (language === "da") return "dansk";
  if (language === "de") return "Deutsch";
  if (language === "dl") return "Ελληνικά";
  if (language === "en") return "English";
  if (language === "et") return "eesti keel";
  if (language === "es") return "español";
  if (language === "fi") return "Suomalainen";
  if (language === "fr") return "Français";
  if (language === "ga") return "Gaeilge";
  if (language === "hi") return "हिन्दी";
  if (language === "hu") return "Magyar";
  if (language === "he") return "עִברִית";
  if (language === "it") return "Italiano";
  if (language === "ja") return "日本語";
  if (language === "ko") return "한국어";
  if (language === "lv") return "latviski";
  if (language === "lt") return "lietuvių";
  if (language === "nl") return "Nederlands";
  if (language === "no") return "norsk";
  if (language === "pl") return "Polski";
  if (language === "pt") return "Português";
  if (language === "sv") return "svenska";
  if (language === "ro") return "Română";
  if (language === "ru") return "Русский";
  if (language === "sr-CS") return "Српски";
  if (language === "sk") return "slovenský";
  if (language === "sl") return "Slovenščina";
  if (language === "th") return "ไทย";
  if (language === "tr") return "Türk";
  if (language === "uk-UA") return "українська";
  if (language === "zh-chs") return "简体中文";
  if (language === "zh-cht") return "繁體中文";
};

// description: 초기 리소스 다운로드 //
export const electrifiedInitialize = async (country_code: string) => {
  await axios({
    url: ELECTRIFIED_INITIALIZE_URL,
    method: "POST",
    data: { app_id: uuidv4(), app_version: APP_VERSION, country_code },
    responseType: ARRAY_BUFFER,
  }).then((response) => unzip(response?.data));
};

// description: 뷰 버전 Check //
export const checkElectrifiedVersion = async (
  electrified_version: number,
  country_code: string
) => {
  axios({
    url: ELECTRIFIED_VERSION_CHECK_URL,
    method: "POST",
    data: { electrified_version, country_code },
    responseType: ARRAY_BUFFER,
  }).then((response) => unzip(response?.data));
};

// description: 번역 버전 Check //
export const checkTranslationVersion = async (
  translation_version: number,
  country_code: string
) => {
  axios({
    url: TRANSLATION_VERSION_CHECK_URL,
    method: "POST",
    data: { translation_version, country_code },
    responseType: ARRAY_BUFFER,
  }).then((response) => unzip(response?.data));
};

// description: resource load //
export const loadResource = async (data: Array<Electrified>) => {
  const result: Array<IAssetValue> = [];
  for (const electrified of data) {
    // description: SELECT Page Resource 추가 //
    result.push(await getAssetValue(electrified.electrified_item_name, electrified.main_image, "", 0, SELECTOR));
    // description: Calculation Popup Resource 추가 //
    result.push(await getAssetValue(electrified.electrified_item_name, electrified.calculation_image, "", 0, CALCULATION));
    // description: 360 Popup Resource 추가 //
    result.push(await getAssetValue(electrified.electrified_item_name, electrified.rotation_image, "", 0, ROTATION));
    // description: Main Page Resource 추가 //
    result.push(await getAssetValue(electrified.electrified_item_name, electrified.main.image, "", electrified.main.sequence_number, ELECTRIFIED_MAIN));
    // description: Highlights Resource 추가 //
    for (const item of electrified.highlights) await setTemplateResource(result, item, electrified.electrified_item_name, HIGHLIGHTS);
    // description: Charging Resource 추가 //
    for (const item of electrified.charging) await setTemplateResource(result, item, electrified.electrified_item_name, CHARGING);
    // description: Benefits Resource 추가 //
    for (const item of electrified.benefits) await setTemplateResource(result, item, electrified.electrified_item_name, BENEFITS);
  }
  return result;
};

// description: resource load //
const getAssetValue = async (
  item_name: string,
  image_name: string,
  video_name: string,
  sequence: number,
  classification: string
) => {
  // description: image url 구하기 //
  const image_url = [await getResourceURL(item_name, image_name)];

  let video_url = "";
  // description: video 값이 존재할 경우 video url 구하기 //
  if (video_name) video_url = await getResourceURL(item_name, video_name);

  return {
    electrified: item_name,
    classification,
    sequence,
    image_url,
    video_url,
  };
};

// description: resource load for Template 1 //
const getAssetValue1 = async (
  item_name: string,
  item: Template_1,
  classification: string
) => {
  // description: image url 구하기 //
  const image_url = [];
  image_url.push(await getResourceURL(item_name, item.image));
  // description: video image가 존재하면 video image 추가 //
  if(item.video_image) image_url.push(await getResourceURL(item_name, item.video_image));

  let video_url = '';
  // description: video 값이 존재할 경우 video url 구하기 //
  if (item.video && !video_url) video_url = await getResourceURL(item_name, item.video);

  return {
    electrified: item_name,
    classification,
    sequence: item.sequence_number,
    image_url,
    video_url,
  };
};

// description: resource load for Template 2 //
const getAssetValue2 = async (
  item_name: string,
  item: Template_2,
  classification: string
) => {
  // description: image url 구하기 //
  const image_url = [];
  // description: contents에서 image 구하기 //
  for (const Template_2_item of item.contents) 
    image_url.push(await getResourceURL(item_name, Template_2_item.image));

  return {
    electrified: item_name,
    classification,
    sequence: item.sequence_number,
    image_url,
    video_url: '',
  };
};

// description: resource url 구하기 //
const getResourceURL = async (item_name: string, resource_name: string) => {
  // description: resource 데이터 받아오기 //
  const resource = await resourceURL(item_name, resource_name);
  // description: resource 확장자 확인 //
  const type = getResorceType(resource_name);
  // description: resource blob 파일 생성 //
  const resource_blob = new Blob([resource], { type });
  // description: resource url 반환 //
  return URL.createObjectURL(resource_blob);
};

// description: resource 확장자 구하기 //
const getResorceType = (resource_name: string) => {
  const extension = resource_name.split(".")[1];
  if (extension === PNG) return IMAGE_PNG;
  if (extension === JPEG) return IMAGE_JPEG;
  if (extension === MP4) return VIDEO_MP4;
};

// description: Template 별 resource 추가 //
const setTemplateResource = async (result: Array<IAssetValue>, item: any, electrified_item_name: string, classification: string) => {
  if(item.type === TEMPLATE_1) result.push(await getAssetValue1(electrified_item_name, item as Template_1, classification));
  if(item.type === TEMPLATE_2) result.push(await getAssetValue2(electrified_item_name, item as Template_2, classification));
  if(item.type === TEMPLATE_3) result.push(await getAssetValue(electrified_item_name, (item as Template_3).image, "", item.sequence_number, classification));
}

// description: Video url 구하기 //
export const getVideoURL = async (data: Array<Electrified>) => {
  const result: Array<IVideoURL> = [];
  for (const electrified of data) 
    for (const item of electrified.charging) 
      await checkVideoURL(electrified.electrified_item_name, item as Template_1, result);
  return result;
}

// description: video url check //
const checkVideoURL = async (electrified_name: string, item: Template_1, result: Array<IVideoURL>) => {
  let flag = false;
  for (const x of result) {
    if(x.video === item.video) {
      flag = true;
    };
  }
  if (flag === true) return;

  const video_url = await getResourceURL(electrified_name, item.video);
  result.push({video: item.video, video_url});
}