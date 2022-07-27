import { useEffect, useState, ChangeEvent } from 'react';

import * as R from 'ramda';

import { PopupCloseIcon } from 'src/assets/images';
import { useElectrifiedSelectStore, useElectrifiedStore, usePopupStore, useGestureStore, useElectrifiedPageStore, useAssetsStore } from 'src/stores';
import { CALCULATION } from 'src/constants';

import './style.css';

function Popup_Calculator() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();
  const { asset_list } = useAssetsStore();

  const [bg_animation, setBgAnimation] = useState<string>('hidden');
  const [content_animation, setContentAnimation] = useState<string>('hidden');
  const [range_value, setRangeVale] = useState<number>(0);
  const [url, setUrl] = useState<string>('');

  const onCloseHandler = () => {
    setContentAnimation('popup-calculator-container-close bg-light-sand');
    setTimeout(() => {
      setBgAnimation('popup-calculator-bg-close');
    }, 200);
    setTimeout(() => {
      setContentAnimation('hidden');
      setBgAnimation('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 480);
  }

  const onRangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeVale(Number(e.currentTarget.value));
  }

  const setURI = () => {
    for (const item of asset_list) 
      if(item.electrified === selected_electrified && item.classification === CALCULATION) {
        setUrl(item.image_url[0]);
        break;
      }
  }

  useEffect(() => {
    setURI();
    setBgAnimation('popup-calculator-bg-open');
    setTimeout(() => {
      setContentAnimation('popup-calculator-container-open bg-light-sand');
    }, 200);
  }, [])

  return (
    <div className="popup-calculator">
      <div className={bg_animation}></div>
      <div className={content_animation}>
        <div>
          <button className="popup-calculator-close-btn" onClick={onCloseHandler}>
            <img className="popup-calculator-close-img" src={PopupCloseIcon} />
          </button>
        </div>
        <div className="popup-calculator-contents-container">
          {/* constants 로 변경 */}
          <p className="b1">Charge every</p>
          <h3 className="popup-calculator-contents-days">
            <span className="popup-calculator-contents-dats-calc">25</span> days *
          </h3>
          <img className="popup-calculator-contents-img" src={url} />
          <div className="popup-calculator-contents-range-box">
            <h6 className="primary-blue">0 km</h6>
            <label className="range-label">
              <span className="range-bubble h6 primary-blue" style={{ position: 'absolute', width: '1.875vw', top: '-1.5625vw', left: `${range_value / 300 * (40.3125 - 1.875)}vw`, textAlign: 'center' }}>{range_value}</span>
              <input min={0} max={300} value={range_value} step={10} onChange={onRangeHandler} className="popup-calculator-contents-range bg-active-blue" type="range" />
            </label>
            <h6 className="primary-blue">300 km</h6>
          </div>
          <h5 className="popup-calculator-contents-subtitle">Your average distance per day</h5>
          <p className="b5 sand">*Driving range may vary slightly depending on road conditions, your driving style and the temperature. It is also dependent on the type of tyres equipped.</p>
        </div>
      </div>
    </div>
  );
}

export default Popup_Calculator;
