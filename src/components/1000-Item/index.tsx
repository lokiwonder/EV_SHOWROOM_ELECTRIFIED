import { useEffect, useState } from "react";
import * as R from "ramda";

import { useAssetsStore, useElectrifiedStore, useGestureStore } from "src/stores";
import { MainButtonIcon } from "src/assets/images";

import "./style.css";
import { SELECTOR } from "src/constants";

//
interface Props {
  electrified_name: string;
  delay: number;
  onSelectHandler: (electrified_name: string, i: number) => void;
}

function MainItem(props: Props) {
  //               variables               //
  const { electrifies } = useElectrifiedStore();
  const { electrified_name, delay, onSelectHandler } = props;
  const { gesture, change } = useGestureStore();
  const { asset_list } = useAssetsStore();
  const [animation, setAnimation] = useState<string>("hidden-fx");
  const [url, setUrl] = useState<string>('');
  const i = R.findIndex(R.propEq("electrified_item_name", electrified_name))(
    electrifies
  );
  const electrified = electrifies[i];
  //               variables               //

  //               hook               //
  useEffect(() => {
    // description: 에니메이션 지연 //
    if (gesture && change)
      setTimeout(() => {
        setAnimation("item-animation");
      }, 400 * delay);
    else setAnimation("item");

    // description: 미리 로드된 resource에서 이미지 불러오기 //
    for(const asset of asset_list)
      if (asset.electrified === electrified_name && asset.classification === SELECTOR) {
        setUrl(asset.image_url[0]);
        break;
      }
  }, []);
  //               hook               //
  return (
    <div className={animation}>
      <div className="item-contents">
        <h3 className="opacity-80">{electrified.electrified_item_name}</h3>
        <div className="electrified-image-container">
          <img className="vehicle-img" src={url} />
        </div>
        <div>
          <button onClick={() => onSelectHandler(electrified_name, i)}>
            <img className="main-button-img opacity-80" src={MainButtonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainItem;
