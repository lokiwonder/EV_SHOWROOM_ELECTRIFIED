import { useEffect, useState } from 'react';

import './style.css';
import { RotationIcon, BarIcon, CalculatorIcon, HomeIcon, MenuIcon } from 'src/assets/images';
import { useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedMenuStore, useElectrifiedStore, useGestureStore, usePopupStore } from 'src/stores';
import { VehicleMenuView } from 'src/screens';

import { Popup_360, Popup_Calculator } from '@components';

interface Props {
  setNext: (next: boolean) => void;
}

function VehicleNav(prop: Props) {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified, getSelectedVehicleIndex, resetSelectVehicle } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage } = useElectrifiedPageStore();
  const { setHighlightPage, setChargingPage, setBenefitPage, resetElectrifiedPage } = useElectrifiedPageStore();
  const { setShow } = useElectrifiedMenuStore();
  const { change, gesture, checkGesture, setChange, noChange } = useGestureStore();
  const { openPopup } = usePopupStore();
  const { popup } = usePopupStore();
  const [ nav_animation, setNavAnimation ] = useState<string>('nav-animation');
  const [ highlight_animation, setHighlightAnimation] = useState<string>('nav-center-item-hidden');
  const [ charging_animation, setChargingAnimation] = useState<string>('nav-center-item-hidden');
  const [ benefits_animation, setBenefitsAnimation] = useState<string>('nav-center-item-hidden');

  const {setNext} = prop;

  const electrified_index = getSelectedVehicleIndex(selected_electrified, electrifies);
  const index_arg = { electrified_index, electrifies };

  const onHomeHandler = () => {
    resetSelectVehicle();
    resetElectrifiedPage();
    setNext(true);
    checkGesture('');
    setChange();
  };

  const onMainHandler = () => {
    checkGesture('main');
    setMainPage(index_arg);
    setNext(true);
    setChange();
  };

  const onHighlightsHandler = () => {
    checkGesture('highlights');
    setHighlightPage(index_arg);
    setNext(true);
    setChange();
  }

  const onChargingHandler = () => {
    checkGesture('charging');
    setChargingPage(index_arg);
    setNext(true);
    setChange();
  }

  const onBenefitsHandler = () => {
    checkGesture('benefits');
    setBenefitPage(index_arg);
    setNext(true);
    setChange();
  }

  const on360Handler = () => {
    checkGesture(electrified_page.page_class);
    openPopup('360');
    setNext(true);
    checkGesture('');
    noChange();
  }

  const onCalculationsHandler = () => {
    checkGesture(electrified_page.page_class);
    openPopup('calculator');
    setNext(true);
    checkGesture('');
    noChange();
  }

  const onElectrifiedMenuHandler = () => {
    checkGesture(electrified_page.page_class);
    setShow();
    setNext(true);
    checkGesture('');
    noChange();
  }

  useEffect(() => {
    if (gesture && change && electrified_page.page_class === 'main') {
        setTimeout(() => {
          setHighlightAnimation('highlights');
        }, 1500);
        setTimeout(() => {
          setChargingAnimation('charging');
        }, 1700);
        setTimeout(() => {
          setBenefitsAnimation('benefits');
        }, 1900);
    }
    else {
      setNavAnimation('nav')
      setHighlightAnimation('nav-center-item');
      setChargingAnimation('nav-center-item');
      setBenefitsAnimation('nav-center-item');
    }
  }, []);

  return (
    <>
      {electrified_page.page_class !== '' && electrified_page.page_class !== 'main' && <progress className="electrified-progress" value={electrified_page.page_present + 1} max={electrified_page.page_length}></progress>}
      <nav className={nav_animation}>
        <div className="nav-left">
          <button onClick={onHomeHandler}>
            <img className="nav-img" src={HomeIcon} />
          </button>
          <img className="left-bar" src={BarIcon} />
          <button onClick={onMainHandler}>
            <h6>{selected_electrified}</h6>
          </button>
        </div>
        <div className="nav-center">
          <div>
            <button className={highlight_animation} onClick={onHighlightsHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'highlights' ? 'active' : 'passive'}>Highlights</h6>
            </button>
            <button className={charging_animation} onClick={onChargingHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'charging' ? 'active' : 'passive'}>Charging</h6>
            </button>
            <button className={benefits_animation} onClick={onBenefitsHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'benefits' ? 'active' : 'passive'}>Benefits</h6>
            </button>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={on360Handler}>
            <img className="nav-img" src={RotationIcon} />
          </button>
          <button onClick={onCalculationsHandler}>
            <img className="nav-img" src={CalculatorIcon} />
          </button>
          <button onClick={onElectrifiedMenuHandler}>
            <img className="menu-img" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
    </>
  );
}

export default VehicleNav;
