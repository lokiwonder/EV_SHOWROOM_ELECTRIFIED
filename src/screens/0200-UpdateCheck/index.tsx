import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Checkmark from "react-typescript-checkmark";

import {
  useSettingStore,
  useUpdateStatusStore,
  useLanguageStore,
  useElectrifiedStore,
  useAssetsStore,
  useVideoStore,
} from "src/stores";
import {
  checkElectrifiedVersion,
  checkTranslationVersion,
  DATA,
  getVideoURL,
  loadResource,
} from "src/function";
import { SPINNER_LOTTIE_OPTIONS } from "src/constants";

import "./style.css";

function UpdateCheck() {
  const { setting, setSetting } = useSettingStore();
  const { update_status, setUpdateStatus } = useUpdateStatusStore();
  const { setLanguage } = useLanguageStore();
  const { electrifies, initElectirified } = useElectrifiedStore();
  const { setAssetList } = useAssetsStore();
  const { setVideos } = useVideoStore();

  const [update1_check, setUpdate1Check] = useState<boolean>(false);
  const [update2_check, setUpdate2Check] = useState<boolean>(false);
  const [update3_check, setUpdate3Check] = useState<boolean>(false);

  const [image_load, setImageLoad] = useState<boolean>(false);
  // const [video_load, setVideoLoad] = useState<boolean>(false);

  // description: setting, language, electrified store 변경 //
  const settingUpdate = async () => {
    const data = await DATA();
    setSetting(data.setting);
    setLanguage(data.setting.default_language);
    initElectirified(data);
  };

  const updates = async () => {
    // description: Electrified View Update check //
    if (update_status === 1) {
      checkElectrifiedVersion(setting.electrified_version, setting.nation).then(
        async () => {
          await settingUpdate();
          setUpdate1Check(true);
          setTimeout(() => setUpdateStatus(update_status + 1), 1500);
        }
      ).catch(() => {
        setUpdate1Check(true);
          setTimeout(() => setUpdateStatus(update_status + 1), 1500);
      });
    }
    // description: Translation Update check //
    if (update_status === 2) {
      checkTranslationVersion(setting.translation_version, setting.nation).then(
        async () => {
          await settingUpdate();
          setUpdate2Check(true);
          setTimeout(() => setUpdateStatus(update_status + 1), 1500);
        }
      ).catch(() => {
        setUpdate1Check(true);
          setTimeout(() => setUpdateStatus(update_status + 1), 1500);
      });
    }
    // description: Asset Load //
    if (update_status === 3) {
      setTimeout(async () => {
        await settingUpdate();
        const electrifies = (await DATA()).translations[0].electrifies;
        load(electrifies);
      }, 1000);
    }
  };

  // description: Load //
  const load = (electrifies: any) => {
    loadResource(electrifies).then((list) => {
      setAssetList(list);
      setImageLoad(true);
    });
    getVideoURL(electrifies).then((list) => {
      setVideos(list);
    });
  }

  const Checker = () => {
    return (
      <>
        <p className="h5 white spinner-comment">Checking update...</p>
        <div style={{ marginTop: "1.562499vw" }}>
          {update_status === 1 && (
            <div className="update-checker">
              {!update1_check ? (
                <Lottie
                  style={{
                    width: "0.625vw",
                    height: "0.625vw",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  options={SPINNER_LOTTIE_OPTIONS}
                />
              ) : (
                <Checkmark
                  size="xs"
                  checkColor="#002c5f"
                  backgroundColor="white"
                  animationDuration={0.8}
                  explosion={1.2}
                />
              )}
              <p className="b6 white opacity-70 spinner-sub-comment">
                Electrified Update check {`( 1 / 2 )`}
              </p>
            </div>
          )}
          {update_status === 2 && (
            <div className="update-checker">
              {!update2_check ? (
                <Lottie
                  style={{
                    width: "0.625vw",
                    height: "0.625vw",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  options={SPINNER_LOTTIE_OPTIONS}
                />
              ) : (
                <Checkmark
                  size="xs"
                  checkColor="#002c5f"
                  backgroundColor="white"
                  animationDuration={0.8}
                  explosion={1.2}
                />
              )}
              <p className="b6 white opacity-70 spinner-sub-comment">
                Translation Update check {`( 2 / 2 )`}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  const Loading = () => {
    return <p className="h5 white">Resource Loading...</p>;
  };

  useEffect(() => {
    updates();
  }, [update_status]);

  useEffect(() => {
    if (image_load) {
      setUpdate3Check(true);
      setTimeout(() => setUpdateStatus(update_status + 1), 1500);
    }
  }, [image_load])

  return (
    <div className="country-background">
      <div className="country-container">
        <div className="spinner-container">
          <div style={{ width: "15vw", height: "16.51vw" }}>
            <Lottie
              style={{ width: "5.20833vw", height: "5.20833vw" }}
              options={SPINNER_LOTTIE_OPTIONS}
            />
            <div>{update_status < 3 ? <Checker /> : <Loading />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCheck;
