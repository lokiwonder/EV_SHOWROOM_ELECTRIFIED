import { useEffect, useState } from "react";
import * as R from "ramda";

import { useElectrifiedStore, useGestureStore } from "src/stores";
import { MainButtonIcon } from "src/assets/images";
import { imageURL } from "src/function";

import "./style.css";

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
  const [animation, setAnimation] = useState<string>("hidden-fx");
  const [url, setUrl] = useState<string>();
  const i = R.findIndex(R.propEq("electrified_item_name", electrified_name))(
    electrifies
  );
  const electrified = electrifies[i];
  //               variables               //

  //               hook               //
  useEffect(() => {
    // description: 에니메이션 지연
    if (gesture && change)
      setTimeout(() => {
        setAnimation("item-animation");
      }, 400 * delay);
    else setAnimation("item");

    // description: 
    const setURI = async () => {
      const binary = await imageURL(electrified_name, electrified.main_image);
      const blob = new Blob([binary], { type: 'image/png' });
      setUrl(URL.createObjectURL(blob));
    }
    
    setURI();
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
