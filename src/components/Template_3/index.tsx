import { useEffect, useState } from 'react';
import { useElectrifiedSelectStore, useElectrifiedPageStore, useGestureStore, usetemplate_3_Store, useAssetsStore } from 'src/stores';

import './style.css';

function Template_3() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { gesture, change } = useGestureStore();
  const { first } = usetemplate_3_Store();
  const { asset_list } = useAssetsStore();

  const [image_animation, setImageAnimation] = useState<string>('hidden');
  const [url, setUrl] = useState<string>('');

  const setURI = () => {
    for (const item of asset_list) 
      if(item.electrified === selected_electrified && item.classification === electrified_page.page_class && item.sequence === electrified_page.page_present) {
        setUrl(item.image_url[0]);
        break;
      }
  }

  useEffect(() => {
    setURI();
    if (first && gesture && change) setImageAnimation(`template-3-image template-3-image-animaion`);
    else if (!first && gesture && change) setImageAnimation(`template-3-image template-3-image-animaion2`);
    else setImageAnimation('template-3-image');
    setTimeout(() => {
    }, 50);
  }, []);

  return (
    <div className="template-3-image-box">
      <img className={image_animation} src={url} />
    </div>
  );
}

export default Template_3;
