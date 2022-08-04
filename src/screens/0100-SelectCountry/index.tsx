import { useState } from "react";

// import * as fs from "@tauri-apps/api/fs";

import {
  HyundaiLogo2,
  BottomArrowIcon,
  SelectLanguageLogo,
} from "src/assets/images";
import { useDownloadStatusStore, useSettingStore } from "src/stores";
import { CountrySelector } from "src/classes";
import { COUNTRIES, SPINNER_LOTTIE_OPTIONS } from "src/constants";
import { electrifiedInitialize, DATA } from "src/function";

import "./style.css";
import Lottie from "react-lottie";


function SelectCountry() {
  const { setSetting } = useSettingStore();
  const { setDownloadStatus } = useDownloadStatusStore();

  const [input_status, setInputStatus] = useState<boolean>(false);
  const [input_text, setInputText] = useState<string>("b3 active");
  const [country, setCountry] = useState<CountrySelector>(
    new CountrySelector()
  );
  const [continue_flag, setCountinueFlage] = useState<boolean>(false);

  const onBackgroundClickHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText("b3 active");
    }
  };

  const onInputHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText("b3 active");
    } else {
      setInputStatus(true);
      setInputText("b3 active");
    }
  };

  const onSelectHandler = (country: CountrySelector) => {
    setCountry(country);
    setInputStatus(false);
    setInputText("b3");
  };

  const setSettings = async () => {
    const setting = (await DATA()).settting;
    console.log('setting');
    console.log(setting);
    setSetting(setting);
    // DATA().then((data) => {
    //   const setting = data.setting;
    //   setSetting(setting);
    // }).catch(async () => {
    //   const setting = (await DATA()).settting;
    //   setSetting(setting);
    // })
  };

  const onContinueHandler = () => {
    const start = new Date().getTime();
    setCountinueFlage(true);
    electrifiedInitialize(country.code).then(async () => {
      const end = new Date().getTime();
      console.log(`run time: ${(end - start) / 1000} sec`);
      await setSettings();
      // setTimeout(() => setSettings(), 1000);
    });
  };

  // component //
  // description: select box component //
  const SelectBox = () => {
    return (
      <div className="selector-box-container">
        <div className="selector-box">
          <ul>
            {COUNTRIES.map((country) => (
              <li key={country.name} onClick={() => onSelectHandler(country)}>
                <p className="b3 conuntry-en-name dark-gray">
                  {country.en_name}
                </p>
                <p className="b6 conuntry-name deep-gray">{country.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const SelectCountryView = () => {
    return (
      <div className="country-select-box">
        <img className="counter-select-logo-img" src={SelectLanguageLogo} />
        <span className="showroom-logo h2 white">
          Plaese select your country
        </span>
        <div className="country-selector" onClick={onInputHandler}>
          {!country.name ? (
            <>
              <span className={input_text}>Select country</span>
              <img className="selectort-arrow" src={BottomArrowIcon} />
            </>
          ) : (
            <>
              <div className="selected-country">
                <span className="b3 conuntry-en-name dark-gray">
                  {country.en_name}
                </span>
              </div>
              <img className="selectort-arrow" src={BottomArrowIcon} />
            </>
          )}
        </div>
      </div>
    );
  };

  const DownloadView = () => {
    return  (
      <div className="country-background">
        <div className="country-container">
          <div className="spinner-container">
            <div style={{ width: "15vw", height: "16.51vw" }}>
              <Lottie
                style={{ width: "5.20833vw", height: "5.20833vw" }}
                options={SPINNER_LOTTIE_OPTIONS}
              />
              <p className="h5 white">Downloading Resource...</p>
            </div>
          </div>
        </div>
    </div>
    )
  }

  const SelectView = () => {
    return (
      <div className="country-background" onClick={onBackgroundClickHandler}>
      <div className="country-container">
        <>
          {!input_status ? <SelectCountryView /> : <SelectBox />}
          <div className="select-country-nav">
            <img className="select-nav-logo" src={HyundaiLogo2} />
            {country.name && (
              <button
                onClick={onContinueHandler}
                className="confirm-button white"
              >
                Continue
              </button>
            )}
          </div>
        </>
      </div>
    </div>
    )
  }

  return (<>{ continue_flag ? (<DownloadView />) : (<SelectView />)}</>);
}

export default SelectCountry;
