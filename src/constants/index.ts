import { CountrySelector } from 'src/classes';
import { SpinnerLottie, SplashLottie } from 'src/assets/lotties';

export const APP_VERSION = '0.0';

export const HIGHLIGHTS = 'highlights';
export const CHARGING = 'charging';
export const BENEFITS = 'benefits';
export const DATAJSON = 'data.json';

export const TEMPLATE_1 = 'Template 1';
export const TEMPLATE_2 = 'Template 2';
export const TEMPLATE_3 = 'Template 3';

export const COUNTRIES: CountrySelector[] = [
  new CountrySelector('BE_Flag.png', 'Belgique', 'Belgium', 'BE'),
  new CountrySelector('BA_Flag.png', 'Bosna i Hercegovina', 'Bosnia and Herzegovina', 'BA'),
  new CountrySelector('CZ_Flag.png', 'Česko', 'Czech', 'CZ'),
  new CountrySelector('XC_Flag.png', 'Ceuta', 'Ceuta', 'XC'),
  new CountrySelector('DK_Flag.png', 'Danmark', 'Denmark', 'DK'),
  new CountrySelector('DE_Flag.png', 'Deutschland', 'Germany', 'DE'),
  new CountrySelector('EE_Flag.png', 'Eesti', 'Estonia', 'EE'),
  new CountrySelector('ES_Flag.png', 'España', 'Spain', 'ES'),
  new CountrySelector('FR_Flag.png', 'France', 'France', 'FR'),
  new CountrySelector('HR_Flag.png', 'Hrvatska', 'Croatia', 'HR'),
  new CountrySelector('IE_Flag.png', 'Ireland', 'Ireland', 'IE'),
  new CountrySelector('IS_Flag.png', 'Ísland', 'Iceland', 'IS'),
  new CountrySelector('IC_Flag.png', 'Islas Canarias', 'Canary Islands', 'IC'),
  new CountrySelector('IT_Flag.png', 'Italia', 'Italy', 'IT'),
  new CountrySelector('LV_Flag.png', 'Latvija', 'Latvia', 'LV'),
  new CountrySelector('LT_Flag.png', 'Lietuva', 'Lithuania', 'LT'),
  new CountrySelector('HU_Flag.png', 'Magyarország', 'Hungary', 'HU'),
  new CountrySelector('MT_Flag.png', 'Malta', 'Malta', 'MT'),
  new CountrySelector('NL_Flag.png', 'Nederland', 'Netherlands', 'NL'),
  new CountrySelector('NO_Flag.png', 'Norge', 'Norway', 'NO'),
  new CountrySelector('AT_Flag.png', 'Österreich', 'Austria', 'AT'),
  new CountrySelector('PL_Flag.png', 'Polska', 'Poland', 'PL'),
  new CountrySelector('PT_Flag.png', 'Portugal', 'Portugal', 'PT'),
  new CountrySelector('RO_Flag.png', 'România', 'Romania', 'RO'),
  new CountrySelector('SI_Flag.png', 'Slovenija', 'Slovenia', 'SI'),
  new CountrySelector('SK_Flag.png', 'Slovensko', 'Slovakia', 'SK'),
  new CountrySelector('FI_Flag.png', 'Suomi', 'Finland', 'FI'),
  new CountrySelector('SE_Flag.png', 'Sverige', 'Sweden', 'SE'),
  new CountrySelector('CH_Flag.png', 'Swiss', 'Switzerland', 'CH'),
  new CountrySelector('TR_Flag.png', 'Türkiye', 'Turkey', 'TR'),
  new CountrySelector('GB_Flag.png', 'United Kingdom', 'United Kingdom', 'GB'),
  new CountrySelector('GR_Flag.png', 'Ελλάδα', 'Greece', 'GR'),
  new CountrySelector('CY_Flag.png', 'Κυπριακή', 'Cyprus', 'CY'),
  new CountrySelector('BG_Flag.png', 'България', 'Bulgaria', 'BG'),
  new CountrySelector('RS_Flag.png', 'Србија', 'Serbia', 'RS'),
];

export const ARRAY_BUFFER = 'arraybuffer';

// export const ELECTRIFIED_INITIALIZE_URL = 'http://localhost:4000/apis/electrified/electrifiedInitialize';
// export const ELECTRIFIED_VERSION_CHECK_URL = 'http://localhost:4000/apis/electrified/electrifiedCheck';
// export const TRANSLATION_VERSION_CHECK_URL = 'http://localhost:4000/apis/electrified/translationCheck'

export const ELECTRIFIED_INITIALIZE_URL = 'http://51.116.98.90:4000/apis/electrified/electrifiedInitialize';
export const ELECTRIFIED_VERSION_CHECK_URL = 'http://51.116.98.90:4000/apis/electrified/electrifiedCheck';
export const TRANSLATION_VERSION_CHECK_URL = 'http://51.116.98.90:4000/apis/electrified/translationCheck'

export const SPLASH_LOTTIE_OPTIONS = {
  animationData: SplashLottie,
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const SPINNER_LOTTIE_OPTIONS = {
  animationData: SpinnerLottie,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const INIT_DATA = {
    app_id: "",
    app_version: APP_VERSION,
    app_type: "ELECTRIFIED",
    nation: "",
    electrified_version: -1,
    translation_version: -1,
    languages: "",
    default_language: "",
}
