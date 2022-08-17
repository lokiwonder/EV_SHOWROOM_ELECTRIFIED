// react-library
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// screens | components
import {
  SplashView,
  VehicleMainView,
  SelectCountryView,
  UpdateCheckView,
  LoginView,
} from "src/screens";
// stores
import {
  useSettingStore,
  useUpdateStatusStore,
  useLoadStore,
  useLoginStateStore,
} from "src/stores";

// import * as regedit from "regedit"; 

import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

// etc
import "./App.css";

function App() {
  //  variable //
  const { setting } = useSettingStore();
  const { update_status } = useUpdateStatusStore();
  const { load_status } = useLoadStore();
  const { login_status } = useLoginStateStore();
  //  variable //

  // description: 마우스 오른쪽 버튼 막기 //
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // let permissionGranted = isPermissionGranted();
  // const setNotification = async () => {
  //   let permissionGranted = await isPermissionGranted();
  //   if (!permissionGranted) {
  //     const permission = await requestPermission();
  //     permissionGranted = permission === 'granted';
  //   }
  // }

  console.log(setting);

  useEffect(() => {
    // setNotification();
    // setTimeout(() => {
    //   if (permissionGranted) {
    //     sendNotification({ title: 'EV CMS', body: 'Tauri is awesome!', icon: '32x32.png' });
    //   }
    // }, 5000);
  }, [])

  return (
    <Router>
      {
        // description: 로그인 상태가 아니면 launcher 실행 //
        !login_status ? 
        (<LoginView />) : 
        // description: 로드 중 일 때 Splash //
        !load_status ? 
        (<SplashView />) : 
        // description: 로드가 완료된 후 data.json 파일이 존재하지 않을 때 //
        setting === undefined ? 
        (<SelectCountryView />) : 
        // description: electrified view, translation update check //
        update_status < 4 ? 
        (<UpdateCheckView />) : 
        // description: 모든 업데이트가 완료되었을 때 //
        (<VehicleMainView />)
      }
    </Router>
  );
}

export default App;
