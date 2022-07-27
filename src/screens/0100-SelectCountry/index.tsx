import { useState } from 'react';

import { HyundaiLogo2, BottomArrowIcon, SelectLanguageLogo } from 'src/assets/images';
import { useSettingStore } from 'src/stores';
import { CountrySelector } from 'src/classes';
import { COUNTRIES } from 'src/constants';
import { electrifiedInitialize, DATA } from 'src/function';

import './style.css';

function SelectCountry() {
  const { setSetting } = useSettingStore();
  const [input_status, setInputStatus] = useState<boolean>(false);
  const [input_text, setInputText] = useState<string>('b3 active');

  const [country, setCountry] = useState<CountrySelector>(new CountrySelector());

  // console.log(new URL(`file://${await path.dataDir()}${selected_electrified}/${image}`, import.meta.url).href);

  const onBackgroundClickHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText('b3 active');
    }
  };

  const onInputHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText('b3 active');
    } else {
      setInputStatus(true);
      setInputText('b3 active');
    }
  };

  const onSelectHandler = (country: CountrySelector) => {
    setCountry(country);
    setInputStatus(false);
    setInputText('b3');
  };

  const setSettings = async () => {
    const setting = (await DATA()).setting;
    setSetting(setting);
  }

  const onContinueHandler = () => {
    electrifiedInitialize(country.code).then(async () => {
      console.log('Finish');
      setSettings();
    });
  };

  // component //
  // description: select box component
  const SelectBox = () => {
    return (
      <div className="selector-box-container">
        <div className="selector-box">
          <ul>
            {COUNTRIES.map((country) => (
              <li key={country.name} onClick={() => onSelectHandler(country)}>
                <p className="b3 conuntry-en-name dark-gray">{country.en_name}</p>
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
      <div className="country-background" onClick={onBackgroundClickHandler}>
      <div className="country-container">
        <>
          {!input_status && (
            <div className="country-select-box">
              <img className="counter-select-logo-img" src={SelectLanguageLogo} />
              <span className="showroom-logo h2 white">Plaese select your country</span>
              <div className="country-selector" onClick={onInputHandler}>
                {!country.name ? (
                  <>
                    <span className={input_text}>Select country</span>
                    <img className="selectort-arrow" src={BottomArrowIcon} />
                  </>
                ) : (
                  <>
                    <div className="selected-country">
                      <span className="b3 conuntry-en-name dark-gray">{country.en_name}</span>
                    </div>
                    <img className="selectort-arrow" src={BottomArrowIcon} />
                  </>
                )}
              </div>
            </div>
          )}
          {input_status && <SelectBox />}
          <div className="select-country-nav">
            <img className="select-nav-logo" src={HyundaiLogo2} />
            {country.name && (
              <button onClick={onContinueHandler} className="confirm-button white">
                Continue
              </button>
            )}
          </div>
        </>
      </div>
    </div>
    )
  }

  return (
    <div className="country-background" onClick={onBackgroundClickHandler}>
      <div className="country-container">
        <>
          {!input_status && (
            <div className="country-select-box">
              <img className="counter-select-logo-img" src={SelectLanguageLogo} />
              <span className="showroom-logo h2 white">Plaese select your country</span>
              <div className="country-selector" onClick={onInputHandler}>
                {!country.name ? (
                  <>
                    <span className={input_text}>Select country</span>
                    <img className="selectort-arrow" src={BottomArrowIcon} />
                  </>
                ) : (
                  <>
                    <div className="selected-country">
                      <span className="b3 conuntry-en-name dark-gray">{country.en_name}</span>
                    </div>
                    <img className="selectort-arrow" src={BottomArrowIcon} />
                  </>
                )}
              </div>
            </div>
          )}
          {input_status && <SelectBox />}
          <div className="select-country-nav">
            <img className="select-nav-logo" src={HyundaiLogo2} />
            {country.name && (
              <button onClick={onContinueHandler} className="confirm-button white">
                Continue
              </button>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default SelectCountry;
