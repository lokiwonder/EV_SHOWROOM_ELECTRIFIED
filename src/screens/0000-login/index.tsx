import { useEffect, useState } from "react";

import { appWindow, PhysicalSize } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/api/process";

import { useLoginStateStore } from "src/stores";

import {
  LAUNCHER_HEIGHT_RATE,
  LAUNCHER_ID,
  LAUNCHER_PASSWORD,
  LAUNCHER_SAVE_ID_PW,
  LAUNCHER_TITLE,
  LAUNCHER_WIDTH_RATE,
} from "src/constants";
import {
  LoginLogo,
  LoginCloseIcon,
  CheckBoxDefault,
  CheckBoxHover,
  CheckBoxSelected,
} from "src/assets/images";

import "./style.css";

function Login() {
  const { setLogin } = useLoginStateStore();
  const [check_hover_status, setCheckHoverStatus] = useState<boolean>(false);
  const [save_id_pw_status, setSaveIdPwStatus] = useState<boolean>(false);

  const screen_width = window.screen.width;

  const onLoginHandler = () => {
    appWindow.setSize(new PhysicalSize(1920, 1080));
    appWindow.setFullscreen(true);
    setLogin();
  };

  const onCloseHandler = () => {
    exit();
  };

  useEffect(() => {
    if (screen_width > 1920)
      appWindow.setSize(
        new PhysicalSize(
          screen_width * LAUNCHER_WIDTH_RATE,
          screen_width * LAUNCHER_HEIGHT_RATE
        )
      );
  }, []);

  return (
    <div className="login-background">
      <div className="login-layout">
        <div>
          <img className="login-logo" src={LoginLogo} alt="" />
        </div>
        <div className="login-title">
          <span className="login-b8 primary-blue">{LAUNCHER_TITLE}</span>
        </div>
        <div className="login-input-container">
          <p className="login-b7 dark-gray login-input-text">{LAUNCHER_ID}</p>
          <input
            className="login-b7 login-input"
            type="text"
            placeholder="Enter your ID"
          />
        </div>
        <div className="login-input-container">
          <p className="login-b7 dark-gray login-input-text">
            {LAUNCHER_PASSWORD}
          </p>
          <input
            className="login-b7 login-input"
            type="password"
            placeholder="Enter your Password"
          />
          <div className="login-save-id-pw">
            <img
              className="login-save-id-pw-checkbox"
              onMouseOver={() => setCheckHoverStatus(true)}
              onMouseOut={() => setCheckHoverStatus(false)}
              onClick={() => setSaveIdPwStatus(!save_id_pw_status)}
              src={
                save_id_pw_status
                  ? CheckBoxSelected
                  : check_hover_status
                  ? CheckBoxHover
                  : CheckBoxDefault
              }
              alt="checkbox"
            />
            <label className="login-b4 deep-gray">{LAUNCHER_SAVE_ID_PW}</label>
          </div>
        </div>
        <div className="login-btn-container">
          <button
            className="login-b7 bg-primary-blue white login-btn"
            onClick={() => onLoginHandler()}
          >
            Login
          </button>
        </div>
      </div>
      <button className="login-exit-btn" onClick={() => onCloseHandler()}>
        <img className="login-exit-icon" src={LoginCloseIcon} alt="" />
      </button>
    </div>
  );
}

export default Login;
