import { useEffect, useState } from 'react';

import { PopupCloseIcon, PopupLeftArrowIcon, PopupRightArrowIcon } from 'src/assets/images';
import { useElectrifiedSelectStore, usePopupStore, useGestureStore, useElectrifiedPageStore, useAssetsStore } from 'src/stores';
import { ROTATION } from 'src/constants';

import './style.css';

function Popup_360() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();
  const { asset_list } = useAssetsStore();

  const [ bg_animation, setBgAnimation ] = useState<string>('hidden');
  const [ content_animation, setContentAnimation ] = useState<string>('hidden');
  const [ image_style, setImageStyle ] = useState<string>('hidden');
  const [ url, setUrl ] = useState<string>();

  const onCloseHandler = () => {
    setContentAnimation('popup-360-container-close');
    setTimeout(() => {
      setBgAnimation('popup-360-bg-close');
    }, 200);
    setTimeout(() => {
      setContentAnimation('hidden');
      setBgAnimation('hidden');
      setImageStyle('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 480);
  } 
  
  const setURI = () => {
    for (const item of asset_list) 
      if(item.electrified === selected_electrified && item.classification === ROTATION) {
        setUrl(item.image_url[0]);
        break;
      }
  }
  
  useEffect(() => {
    setURI();
    setBgAnimation('popup-360-bg-open');
    setTimeout(() => {
      setContentAnimation('popup-360-container-open');
      setImageStyle('popup-360-contents-img');
    }, 200);
  }, [])
  
  return (
    <div className="popup-360">
      <div className={bg_animation}></div>
      <div className={content_animation}>
        <div>
          <button className="popup-360-close-btn" onClick={onCloseHandler}>            
          <img className="popup-360-close-img" src={PopupCloseIcon}/>
          </button>
        </div>
        <div className="popup-360-contents-container">
          <button><img className="popup-360-contents-btn" src={PopupLeftArrowIcon} /></button>
          <img className={image_style} src={url}></img>
          <button><img className="popup-360-contents-btn" src={PopupRightArrowIcon} /></button>
        </div>
      </div>
    </div>
  );
}

export default Popup_360;
