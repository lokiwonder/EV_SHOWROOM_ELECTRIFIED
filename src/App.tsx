// react-library
import { BrowserRouter as Router } from 'react-router-dom';
// screens | components
import { SplashView, VehicleMainView, SelectCountryView, UpdateCheckView } from 'src/screens';
// stores
import { useSettingStore, useUpdateStatusStore, useLoadStore } from 'src/stores';

// etc
import './App.css';

function App() {
  //  variable
  const { setting } = useSettingStore();
  const { update_status } = useUpdateStatusStore();
  const { load_status } = useLoadStore();
  //  variable

  console.log(setting);
  // console.log(os.homedir);

  return (
    <Router>
      { 
        // description: 로드 중 일 때 Splash //
        !load_status ? 
        (<SplashView />) :
        // description: 로드가 완료된 후 data.json 파일이 존재하지 않을 때 //
        setting === undefined ? 
        (<SelectCountryView />) : 
        // description: electrified view, translation update check //
        update_status < 3 ? 
        (<UpdateCheckView />) :
        // description: 모든 업데이트가 완료되었을 때 //
        (<VehicleMainView />) 
        
      }
      
    </Router>
  );
}

export default App;
