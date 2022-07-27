import { MouseEvent, useEffect, useState } from "react";

import { MainNav, VehicleNav } from "src/navigations";
import {
  Item,
  Template_1,
  Template_2,
  Template_3,
  Popup_360,
  Popup_Calculator,
} from "src/components";
import {
  useElectrifiedSelectStore,
  useElectrifiedPageStore,
  useElectrifiedStore,
  useGestureStore,
  usePopupStore,
  usetemplate_3_Store,
  useSettingStore,
  useAssetsStore,
} from "src/stores";
import {
  RightArrowIcon,
  HandNextIcon,
  HandPreviousIcon,
} from "src/assets/images";
import {
  BENEFITS,
  CHARGING,
  HIGHLIGHTS,
  TEMPLATE_1,
  TEMPLATE_2,
  TEMPLATE_3,
} from "src/constants";
import { imageURL } from "src/function";

import "./style.css";

import * as R from "ramda";

function Main() {
  //                variable                //
  //                variable                //
  const { electrifies } = useElectrifiedStore();
  const { setting } = useSettingStore();
  const {
    selected_electrified,
    selectVehicle,
    getSelectedVehicleIndex,
    resetSelectVehicle,
  } = useElectrifiedSelectStore();
  const {
    electrified_page,
    setMainPage,
    setChargingPage,
    setBenefitPage,
    increasePage,
    decreasePage,
  } = useElectrifiedPageStore();
  const { gesture, change, home, checkGesture, setChange, noChange, setHome } =
    useGestureStore();
  const { popup } = usePopupStore();
  const { setFirst, notFirst } = usetemplate_3_Store();
  const { asset_list } = useAssetsStore();

  const [next, setNext] = useState<boolean>(true);

  const electrified_index = getSelectedVehicleIndex(
    selected_electrified,
    electrifies
  );
  const index_arg = { electrified_index, electrifies };

  // description: 배열
  const i = R.findIndex(
    R.propEq("electrified_item_name", selected_electrified)
  )(electrifies);
  const electrified = electrifies[i];

  let mouseX = 0;
  //                variable                //
  //                variable                //

  //                function                //
  //                function                //
  // description: 클릭시 화면 제스쳐
  // const onActionHandler = () => checkGesture(electrified_page.page_class);

  // description: 화면을 눌렀을 때 (때지 않음)
  const touchStart = (e: MouseEvent<HTMLDivElement>) => (mouseX = e.clientX);

  // todo: 훅으로 전환
  // description: 화면에서 땠을 때
  const touchEnd = (e: MouseEvent<HTMLDivElement>) => {
    // description: popup 상태에서는 화면전환 막음
    if (popup !== "") return;
    // description: 오른쪽에서 왼쪽으로
    if (mouseX >= window.innerWidth / 2) {
      // description: 다음 화면으로 이동
      if (mouseX - e.clientX > window.innerWidth / 5) {
        // description: 페이지가 길이 - 1 낮으면 화면 전환
        if (electrified_page.page_present < electrified_page.page_length - 1) {
          setChange();
          // description: 만약 화면이 template_3이면
          if (electrified_page.page.type === TEMPLATE_3) notFirst();
          else setFirst();
          setNext(true);
          increasePage(index_arg);
          checkGesture(electrified_page.page_class);
        }
        // description: 페이지가 길이 - 1 이면 오른쪽 설명 창 띄움 (state 먹이기) (false)
        else if (
          next &&
          electrified_page.page_present == electrified_page.page_length - 1
        ) {
          noChange();
          setNext(false);
          checkGesture(electrified_page.page_class);
        }
        // description: state가 false 이면 true 로 바꾸고 다음 창으로 전환
        else if (!next) {
          if (electrified_page.page_class === HIGHLIGHTS) {
            setChange();
            // todo: constants로 변경
            // description: 현재 페이지가 highlights 일 때
            if (electrified_page.page.type === TEMPLATE_3) notFirst();
            else setFirst();
            setNext(true);
            setChargingPage(index_arg);
            checkGesture(electrified_page.page_class);
          }
          // description: 현재 페이지가 charging 일 때
          else if (electrified_page.page_class === CHARGING) {
            setChange();
            if (electrified_page.page.type === TEMPLATE_3) notFirst();
            else setFirst();
            setNext(true);
            setBenefitPage(index_arg);
            checkGesture(electrified_page.page_class);
          }
          // description: 현재 페이지가 benefits 일 때
          else if (electrified_page.page_class === BENEFITS) {
            setChange();
            if (electrified_page.page.type === TEMPLATE_3) notFirst();
            else setFirst();
            setNext(true);
            setMainPage(index_arg);
            checkGesture("main");
          }
        }
      }
    }
    // description: 왼쪽에서 오른쪽으로
    else if (mouseX <= window.innerWidth / 2) {
      // description: 이전 화면으로 이동 (메인이 아니면서 페이지가 0보다 크면 화면 전환)
      if (
        (mouseX - e.clientX) * -1 > window.innerWidth / 5 &&
        electrified_page.page_present > 0
      ) {
        setNext(true);
        decreasePage(index_arg);
        setChange();
        checkGesture(electrified_page.page_class);
      }
    }
  };
  //                function                //
  //                function                //

  //                component                //
  //                component                //
  // description:
  const ShowroomMainComponent = () => {
    const onSelectHandler = (vehicle_name: string, i: number) => {
      selectVehicle(vehicle_name);
      setMainPage({ electrified_index: i, electrifies });
      setChange();
    };

    return (
      <div className="fx main-background">
        {setting &&
          setting.displayable_electrifies.map((electrified: any, idx: any) => (
            <Item
              electrified_name={electrified}
              delay={idx}
              onSelectHandler={onSelectHandler}
            />
          ))}
        <MainNav />
      </div>
    );
  };

  // description:
  const ElectrifiedComponent = () => {
    return (
      <>
        {popup === "360" && <Popup_360 />}
        {popup === "calculator" && <Popup_Calculator />}
        {electrified_page.page_class === "main" ? (
          <ElectrifiedMainComponent />
        ) : (
          <ElectrifiedContentsComponent />
        )}
        <VehicleNav setNext={setNext} />
      </>
    );
  };

  // description:
  const ElectrifiedMainComponent = () => {
    const [title_animation, setTitleAnimation] =
      useState<string>("display-none");
    const [sub_animation, setSubAnimation] = useState<string>("display-none");
    const [img_animation, setImgAnimation] = useState<string>("hidden");
    const [url, setUrl] = useState<string>("");

    const setURI = () => {
      for (const item of asset_list) {
        if(item.electrified === selected_electrified && item.classification === 'main' && item.sequence === 0) {
          console.log(item);
          setUrl(item.image_url[0]);
          break;
        }
      }
        
      // const binary = await imageURL(
      //   selected_electrified,
      //   electrified_page.page.image
      // );
      // const blob = new Blob([binary], { type: "image/png" });
      // setUrl(URL.createObjectURL(blob));
    };

    useEffect(() => {
      console.log('test');
      // setURI().then((r) => {
      //   if (gesture && change) {
      //     setImgAnimation("vehicle-main-img-animation");
      //     if (selected_electrified === "KONA Electric") {
      //       setTimeout(() => {
      //         setTitleAnimation("electrified-title-animaion white");
      //       }, 900);
      //       setTimeout(() => {
      //         setSubAnimation("b2 electrified-sub-animaion white");
      //       }, 1200);
      //     } else {
      //       setTimeout(() => {
      //         setTitleAnimation("electrified-title-animaion");
      //       }, 900);
      //       setTimeout(() => {
      //         setSubAnimation("b2 electrified-sub-animaion");
      //       }, 1200);
      //     }
      //   } else {
      //     setImgAnimation("vehicle-main-img");
      //     if (selected_electrified === "KONA Electric") {
      //       setTitleAnimation("white");
      //       setSubAnimation("b2 white");
      //     } else {
      //       setTitleAnimation("");
      //       setSubAnimation("b2");
      //     }
      //   }
      // });
      setURI();
      if (gesture && change) {
        setImgAnimation("vehicle-main-img-animation");
        if (selected_electrified === "KONA Electric") {
          setTimeout(() => {
            setTitleAnimation("electrified-title-animaion white");
          }, 900);
          setTimeout(() => {
            setSubAnimation("b2 electrified-sub-animaion white");
          }, 1200);
        } else {
          setTimeout(() => {
            setTitleAnimation("electrified-title-animaion");
          }, 900);
          setTimeout(() => {
            setSubAnimation("b2 electrified-sub-animaion");
          }, 1200);
        }
      } else {
        setImgAnimation("vehicle-main-img");
        if (selected_electrified === "KONA Electric") {
          setTitleAnimation("white");
          setSubAnimation("b2 white");
        } else {
          setTitleAnimation("");
          setSubAnimation("b2");
        }
      }
    }, []);

    return (
      <div className="vehicle-main-img-container">
        <div className="main-text-container">
          <h1 className={title_animation}>{selected_electrified}</h1>
          <p className={sub_animation}>{electrified.electrified_subtitle}</p>
        </div>
        <div className="vehicle-main-image-box">
          <img className={img_animation} src={url} />
        </div>
      </div>
    );
  };

  // description:
  const ElectrifiedContentsComponent = () => {
    return (
      <div onMouseDown={touchStart} onMouseUp={touchEnd}>
        {!next && <NextSlideComponent />}
        {!gesture && <GesturePopupComponent />}
        {electrified_page.page.type === TEMPLATE_1 && <Template_1 />}
        {electrified_page.page.type === TEMPLATE_2 && <Template_2 />}
        {electrified_page.page.type === TEMPLATE_3 && <Template_3 />}
      </div>
    );
  };

  // description:
  const NextSlideComponent = () => {
    const [next_slide_animation, setNextSlideAnimation] = useState<string>(
      "next-slide bg-primary-blue"
    );

    const onNextHandler = () => {
      if (electrified_page.page_class === "highlights") {
        setChange();
        // todo: constants로 변경
        // description: 현재 페이지가 highlights 일 때
        if (electrified_page.page.type === "template_3") notFirst();
        else setFirst();
        setNext(true);
        setChargingPage(index_arg);
        checkGesture(electrified_page.page_class);
      }
      // description: 현재 페이지가 charging 일 때
      else if (electrified_page.page_class === "charging") {
        setChange();
        if (electrified_page.page.type === "template_3") notFirst();
        else setFirst();
        setNext(true);
        setBenefitPage(index_arg);
        checkGesture(electrified_page.page_class);
      }
      // description: 현재 페이지가 benefits 일 때
      else if (electrified_page.page_class === "benefits") {
        setChange();
        if (electrified_page.page.type === "template_3") notFirst();
        else setFirst();
        setNext(true);
        setMainPage(index_arg);
        checkGesture("main");
      }
    };

    useEffect(() => {
      if (!gesture) setNextSlideAnimation("next-slide bg-primary-blue");
      else setNextSlideAnimation("next-slide-animation  bg-primary-blue");
    }, []);

    return (
      <div className={next_slide_animation}>
        <div>
          <h3 className="white slide-title" onClick={onNextHandler}>
            {electrified_page.page_class !== "benefits"
              ? "Next "
              : "Go to home "}
            <img className="right-arrow" src={RightArrowIcon} />
          </h3>
          {electrified_page.page_class !== "benefits" && (
            <p className="b2 white next-slide-content">
              {electrified_page.page_class === "highlights" && "Full Electric"}
              {electrified_page.page_class === "charging" && "Benefits"}
            </p>
          )}
        </div>
      </div>
    );
  };

  // description:
  const GesturePopupComponent = () => {
    return (
      <div
        className="gesture-guide"
        onClick={() => checkGesture(electrified_page.page_class)}
      >
        <span className="gesture-box">
          <img
            className="gesture-img gesture-img-prev"
            src={HandPreviousIcon}
          />
          <p className="b1 white gesture-prev">Previous</p>
        </span>
        <span className="gesture-box">
          <img className="gesture-img gesture-img-next" src={HandNextIcon} />
          <p className="b1 white gesture-next">Next</p>
        </span>
      </div>
    );
  };
  //                component                //
  //                component                //

  useEffect(() => {
    if (home) {
      setHome();
      resetSelectVehicle();
      setChange();
      checkGesture("");
    }
  }, [home]);

  return (
    <>
      {!selected_electrified ? (
        <ShowroomMainComponent />
      ) : (
        <ElectrifiedComponent />
      )}
    </>
  );
}

export default Main;
