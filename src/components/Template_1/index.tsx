import { useEffect, useState } from 'react';

import { useElectrifiedSelectStore, useElectrifiedPageStore, usePopupStore, useGestureStore, useAssetsStore } from 'src/stores';
import { Popup_Video } from 'src/components';
import { PlayIcon } from 'src/assets/images';

import './style.css';

function Template_1() {
  //        variable        //
  // description: 기본 기능 처리들을 위한 state //
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { gesture, change, noChange, checkGesture } = useGestureStore();
  const { popup, openPopup } = usePopupStore();
  const { asset_list } = useAssetsStore();

  // description: 화면 전환 애니메이션 처리를 위한 state //
  const [background_animation, setBackgroundAnimation] = useState<string>('hidden');
  const [title_animation, setTitleAnimation] = useState<string>('hidden');
  const [comment_animation, setCommentAnimation] = useState<string>('hidden');
  const [img_Animation, setImgAnimation] = useState<string>('hidden');
  const [description_Animation, setDescriptionAnimation] = useState<string>('hidden');
  const [video_img_animation, setVideoImgAnimation] = useState<string>('hidden');
  const [video_thumb_animation, setVideoThumbAnimation] = useState<string>('video-thumb-img');
  const [page_number, setPageNumber] = useState<string>('hidden');
  const [url, setUrl] = useState<string>('');
  const [thumbUrl, setThumbUrl] = useState<string>('');
  //        variable        //

  //        function        //
  // description: 비디오 팝업 처리를 위한 함수
  const onVideoHandler = () => {
    setVideoThumbAnimation('video-thumb-img-open');
    setBackgroundAnimation('popup-video-open-animation');
    setTimeout(() => {
      openPopup('video');
      checkGesture('');
      noChange();
    }, 780);
  };

  // description: 애니메이션 효과 처리
  const setAnimation = () => {
    setPageNumber('page_number');
    if (popup === 'video') {
      setTitleAnimation('title');
      setImgAnimation('img-container');
      setCommentAnimation('b2 comment');
      setDescriptionAnimation('b4 description');
      setVideoImgAnimation('vedio_img_container');
    } else if (gesture && change) {
      if (popup === '') {
        setTitleAnimation('title-animation');
        setImgAnimation('img-container-animation');
        setTimeout(() => {
          setCommentAnimation('b2 comment-animation');
          setDescriptionAnimation('b4 description-animation');
        }, 200);
        if (electrified_page.page_present === 0) setTimeout(() => setVideoImgAnimation('vedio_img_container-animation'), 300);
        else setVideoImgAnimation('vedio_img_container-animation2');
      }
    } else {
      setTitleAnimation('title');
      setImgAnimation('img-container');
      setCommentAnimation('b2 comment');
      setDescriptionAnimation('b4 description');
      setVideoImgAnimation('vedio_img_container');
    }
  };

  const setURI = () => {
    for (const item of asset_list) 
      if(item.electrified === selected_electrified && item.classification === electrified_page.page_class && item.sequence === electrified_page.page_present) {
        setUrl(item.image_url[0]);
        setThumbUrl(item.image_url[1]);
        break;
      }
  }
  //        function        //

  //        hook        //
  // description: 화면 전환 애니메이션 처리를 위한 useEffect hook //
  useEffect(() => {
    setURI();
    setAnimation();
  }, []);
  //        hook        //

  // todo: 조건부 렌더링 부분 로컬 컴포넌트 함수로 바꾸기 //
  // todo: url 컨트롤 //
  return (
    <div className="container">
      <div className={background_animation}></div>
      <div className="contents-container">
        <div>
          <h2 className={title_animation}>{electrified_page.page.title}</h2>
          <p className={comment_animation}>{electrified_page.page.comment}</p>
          <p className={description_Animation}>{electrified_page.page.description}</p>
        </div>
        <div className="contents-bottom">
          {electrified_page.page_class !== 'highlights' && (
            <div className={page_number}>
              <h2 className="primary-blue fx-1">
                {electrified_page.page_present + 1}
                <span className="page-lenght"> /{electrified_page.page_length}</span>
              </h2>
            </div>
          )}
          {electrified_page.page.video_image && (
            <div className={video_img_animation}>
              <h6 className="primary-blue">How to charge</h6>
              <button className='video-thumb-btn' onClick={onVideoHandler}>
                <img className={video_thumb_animation} src={thumbUrl} />
                <img className="video-thumb-play-btn" src={PlayIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={img_Animation}>
        <img className="img" src={url} />
      </div>
      {popup === 'video' && <Popup_Video video={new URL(`/${selected_electrified}/${electrified_page.page.video_image}`, import.meta.url).href} />}
    </div>
  );
}

export default Template_1;
