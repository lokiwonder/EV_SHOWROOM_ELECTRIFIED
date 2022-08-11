import { DATA } from "src/function";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { SPLASH_LOTTIE_OPTIONS } from 'src/constants';
import { useLoadStore, useSettingStore } from 'src/stores';

import "./style.css";

function Splash() {
  const { setSetting } = useSettingStore();
  const { setLoad } = useLoadStore();
  const [ flag, setFlag ] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 200)
    setTimeout(async () => {
      setSetting((await DATA()).setting);
      setLoad();
    }, 2350);
  }, []);

  return (
    <div className="splash-background">
      <div className="splash-container">
        {/* <Lottie style={{width: '26.354vw', height: '8.229vw'}} options={SPLASH_LOTTIE_OPTIONS} /> */}
        {flag && (<Lottie style={{width: '33.54166vw', height: '33.54166vw'}} options={SPLASH_LOTTIE_OPTIONS} />)}
      </div>
    </div>
  );
}

export default Splash;
