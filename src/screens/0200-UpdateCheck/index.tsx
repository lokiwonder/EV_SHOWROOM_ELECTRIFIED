import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Checkmark from 'react-typescript-checkmark';

import { useSettingStore, useUpdateStatusStore, useLanguageStore, useElectrifiedStore, useAssetsStore } from 'src/stores';
import { checkElectrifiedVersion, checkTranslationVersion, DATA, imageURL } from 'src/function';
import { SPINNER_LOTTIE_OPTIONS } from 'src/constants';

import './style.css'

function UpdateCheck() {
  const { setting, setSetting } = useSettingStore();
  const { update_status, setUpdateStatus } = useUpdateStatusStore();
  const { setLanguage } = useLanguageStore();
  const { electrifies, initElectirified } = useElectrifiedStore();
  const { setAssetList } = useAssetsStore();

  const [update1_check, setUpdate1Check] = useState<boolean>(false);
  const [update2_check, setUpdate2Check] = useState<boolean>(false);

  // description: setting, language, electrified store 변경 //
  const settingUpdate = async () => {
    setSetting((await DATA()).setting);
    setLanguage((await DATA()).setting.default_language);
    initElectirified((await DATA()));
  }

  const updates = async () => {
    // description: Electrified View Update check //
    if(update_status === 1) {
      checkElectrifiedVersion(setting.electrified_version, setting.nation)
      .then(async () => {
        await settingUpdate();
        setUpdate1Check(true);
        setTimeout(() => setUpdateStatus(update_status + 1), 1500);
      })
    }
    // description: Translation Update check //
    if (update_status === 2) {
      checkTranslationVersion(setting.translation_version, setting.nation)
      .then(async () => {
        await settingUpdate();
        setUpdate2Check(true);
        setTimeout(() => setUpdateStatus(update_status + 1), 1500);
      })
    }
    // description: Asset Load //
    if (update_status === 3) {
      // description: test //
      const binary = await imageURL('IONIQ 5', '02ce29b5-fe60-4cb5-ab58-d193051e464a.png');
      const blob = new Blob([binary], { type: "image/png" });
      const image = URL.createObjectURL(blob);
      const item = {
        electrified: 'IONIQ 5',
        classification: 'main',
        sequence: 0,
        image_url: [image],
        video_url: ''
      }
      const list = [item]
      setAssetList(list);
      setTimeout(() => setUpdateStatus(update_status + 1), 1500);
    }
  }

  const Checker = () => {}

  useEffect(() => {
    updates();
  }, [update_status]);


  return (
    <div className="country-background">
      <div className="country-container">
        <div className="spinner-container">
          <div style={{ width: '13.8541vw', height: '16.51vw' }}>
            <Lottie style={{ width: '5.20833vw', height: '5.20833vw' }} options={SPINNER_LOTTIE_OPTIONS} />
            <div>
              <p className="h5 white spinner-comment">Checking update...</p>
              <div style={{ marginTop: '1.562499vw' }}>
                {update_status >= 1 && (
                  <div className="update-checker">
                    {!update1_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={SPINNER_LOTTIE_OPTIONS} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Electrified Update check {`( 1 / 3 )`}</p>
                  </div>
                )}
                {update_status >= 2 && (
                  <div className="update-checker">
                    {!update2_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={SPINNER_LOTTIE_OPTIONS} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Translation Update check {`( 2 / 3 )`}</p>
                  </div>
                )}
                {update_status >= 3 && (
                  <div className="update-checker">
                    {!update2_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={SPINNER_LOTTIE_OPTIONS} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Translation Update check {`( 3 / 3 )`}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCheck;
