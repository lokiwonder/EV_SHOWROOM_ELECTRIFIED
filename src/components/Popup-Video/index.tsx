import { getResourceURL } from '@function';
import { useEffect, useRef, useState } from 'react';

import { PopupCloseIcon, ChargingThumb } from 'src/assets/images';
import { usePopupStore, useGestureStore, useElectrifiedPageStore, useVideoStore, useElectrifiedSelectStore } from 'src/stores';

import './style.css';

function Popup_Video() {
  // const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();
  // const { asset_list } = useAssetsStore();
  const { videos } = useVideoStore();

  const [background_animation, setBackgroundAnimation] = useState<string>('popup-video-background');
  const [media_animation, setMediaAnimation] = useState<string>('hidden');
  const [close_btn_animation, setCloseBtnAnimation] = useState<string>('popup-close-btn hidden');
  const [url, setUrl] = useState<string>('');

  const ref = useRef<HTMLVideoElement>(null);

  const setURI = () => {
    // setUrl(await getResourceURL(selected_electrified, electrified_page.page.video));
    for (const item of videos)  {
      if(item.video === electrified_page.page.video) {
        setUrl(item.video_url);
        break;
      }
    }
      
  }

  const onCloseHandler = () => {
    setBackgroundAnimation('popup-video-close-animation');
    setMediaAnimation('popup-media-close');
    setCloseBtnAnimation('popup-close-btn popup-close-btn-close-animation');

    setTimeout(() => {
      setMediaAnimation('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 780);
  };

  useEffect(() => {
    setURI();
    setBackgroundAnimation('popup-video-background');
    setMediaAnimation('popup-media-open');
    setCloseBtnAnimation('popup-close-btn popup-close-btn-open-animation');

    ref.current.play();
  }, []);

  return (
    <div className="popup-video">
      <div className={background_animation}></div>
      <div className="popup-container-open-animation">
        <div>
          <button className={close_btn_animation} onClick={onCloseHandler}>
            <img className="popup-close-img" src={PopupCloseIcon} />
          </button>
        </div>
        <div className="popup-tmp-container">
          <video ref={ref} className={media_animation} poster={ChargingThumb} autoPlay controls src={url}></video>
        </div>
      </div>
    </div>
  );
}

export default Popup_Video;
