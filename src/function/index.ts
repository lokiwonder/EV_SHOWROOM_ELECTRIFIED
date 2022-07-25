import {
  APP_VERSION,
  ARRAY_BUFFER,
  ELECTRIFIED_INITIALIZE_URL,
  ELECTRIFIED_VERSION_CHECK_URL,
  TRANSLATION_VERSION_CHECK_URL,
} from "src/constants";

import { v4 as uuidv4 } from "uuid";
import * as JSZip from "jszip";
import axios from "axios";
import * as fs from "@tauri-apps/api/fs";
import * as path from "@tauri-apps/api/path";
import { rmSync } from "fs";
// import * as path from 'path';

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
    if (file_name === 'data.json') {
      // description: 문자열로 파일 압축 해제 //
      const content = await zip.files[file_name].async('string');
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
          await fs.readDir(`${file_name}`, { dir: fs.BaseDirectory.Document })
        } catch (e) {
          // description: 폴더가 존재하지 않는다면 폴더 생성 //
          await fs.createDir(`${file_name}`, { dir: fs.BaseDirectory.Document });
        }
      }
      // description: 이미지 파일일 때 //
      else {
        const content =  await zip.files[file_name].async('uint8array');
        (await fs.writeBinaryFile(`${file_name}`, content, {
          dir: fs.BaseDirectory.Document,
        }));
      }
    }
    // description: Is directory
    // try {
    //   if (zip.files[file_name].dir)
    //   console.log(
    //     await fs.readDir(`${file_name}`, { dir: fs.BaseDirectory.Document })
    //   );
    //   zip.files[file_name].dir &&
    //     await fs.readDir(`${file_name}`, { dir: fs.BaseDirectory.Document })
    // } catch (e) {
      
    // }
    // zip.files[file_name].dir &&
    //   !await fs.readDir(`${file_name}`, { dir: fs.BaseDirectory.Document }) &&
    //   await fs.createDir(`${file_name}`, { dir: fs.BaseDirectory.Document });
    // description: Is not directory
    // !zip.files[file_name].dir &&
    //   (await fs.writeBinaryFile(`${file_name}`, content, {
    //     dir: fs.BaseDirectory.Document,
    //   }));
  });
};

export const DATA = async () => {
  try {
    const data_file = await fs.readTextFile(`data.json`, {
      dir: fs.BaseDirectory.Document,
    });
    return JSON.parse(data_file);
  } catch (e) {
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

export const imageURL = async (selected_electrified: string, image: string) => {
  // return new URL(
  //   `file://${await path.documentDir()}${selected_electrified}/${image}`,
  //   import.meta.url
  // ).href;
  // return `file://${await path.dataDir()}${selected_electrified}/${image}`;
  return await fs.readBinaryFile(`${selected_electrified}/${image}`, {dir: fs.BaseDirectory.Document});
};

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

export const electrifiedInitialize = async (country_code: string) => {
  await axios({
    url: ELECTRIFIED_INITIALIZE_URL,
    method: "POST",
    data: { app_id: uuidv4(), app_version: APP_VERSION, country_code },
    responseType: ARRAY_BUFFER,
  }).then((response) => unzip(response?.data));
};

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
