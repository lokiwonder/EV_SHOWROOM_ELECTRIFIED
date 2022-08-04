import { exit } from '@tauri-apps/api/process';

import {
  useElectrifiedMenuStore,
  useElectrifiedStore,
  useLanguageStore,
  useSettingStore,
} from "src/stores";
import { VehicleMenuView } from "src/screens";

import "./style.css";
import {
  LanguageIcon,
  LanguageActiveIcon,
  Logo,
  MenuIcon,
} from "src/assets/images";
import { useEffect, useState } from "react";
import { DATA, LANGUAGE } from "src/function";

function MainNav() {
  const { setShow } = useElectrifiedMenuStore();
  const { setting } = useSettingStore();
  const { language, setLanguage } = useLanguageStore();
  const { setElectirified } = useElectrifiedStore();

  const [language_menu, setLanguageMenu] = useState<boolean>(false);
  const [language_animation, setLanguageAnimation] =
    useState<string>("language-menu-open");
  const [exit_status, setExitStatus] = useState<number>(0);

  const onExitHandler = () => {
    clearTimeout();
    setTimeout(() => {
      setExitStatus(0);
    }, 2500);
    setExitStatus(exit_status + 1);
  };

  const onLanguageHandler = () => {
    if (language_menu) {
      setLanguageAnimation("language-menu-close");
      setTimeout(() => {
        setLanguageAnimation("display-none");
        setLanguageMenu(!language_menu);
      }, 350);
    } else {
      setLanguageAnimation("language-menu-open");
      setLanguageMenu(!language_menu);
    }
  };

  const onLanguageSelectHandler = (lang: string) => {
    setLanguage(lang);
    setElectirified(DATA(), lang);
    if (language_animation) {
      setLanguageAnimation("language-menu-close");
      setTimeout(() => {
        setLanguageAnimation("display-none");
        setLanguageMenu(!language_menu);
      }, 350);
    } else {
      setLanguageAnimation("language-menu-open");
      setLanguageMenu(!language_menu);
    }
  };

  useEffect(() => {
    setLanguageAnimation("language-menu-open");
  }, []);

  useEffect(() => {
    if(exit_status === 5) exit();
  }, [exit_status]);

  return (
    <>
      <nav className="main-nav">
        <div className="main-nav-left" onClick={() => onExitHandler()}>
          <img className="main-logo" src={Logo} />
        </div>
        <div className="main-nav-right">
          <button className="mrl-15" onClick={onLanguageHandler}>
            <img
              className="main-nav-img-btn"
              src={language_menu ? LanguageActiveIcon : LanguageIcon}
            />
          </button>
          <button className="mrl-15" onClick={setShow}>
            <img className="main-nav-img-btn" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
      {language_menu && (
        <div className={language_animation}>
          <div className="language-list">
            {setting &&
              setting.languages.map((item: any) => (
                <p
                  className={
                    language === item ? "language-item-active" : "language-item"
                  }
                  onClick={() => onLanguageSelectHandler(item)}
                >
                  {LANGUAGE(item)}
                </p>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MainNav;
