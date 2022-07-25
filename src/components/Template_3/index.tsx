import { useEffect, useState } from 'react';
import { useElectrifiedSelectStore, useElectrifiedPageStore, useGestureStore, usetemplate_3_Store } from 'src/stores';
import { imageURL } from 'src/function';

import './style.css';

function Template_3() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { gesture, change } = useGestureStore();
  const { first } = usetemplate_3_Store();

  const [image_animation, setImageAnimation] = useState<string>('hidden');
  const [url, setUrl] = useState<string>('');

  const setURI = async () => {
    const binary = await imageURL(selected_electrified, electrified_page.page.image);
    const blob = new Blob([binary], { type: 'image/png' });
    setUrl(URL.createObjectURL(blob));
  }

  useEffect(() => {
    setURI().then(r => {
      if (first && gesture && change) setImageAnimation(`template-3-image template-3-image-animaion`);
      else if (!first && gesture && change) setImageAnimation(`template-3-image template-3-image-animaion2`);
      else setImageAnimation('template-3-image');
      setTimeout(() => {
      }, 50);
    });
  }, []);

  return (
    <div className="template-3-image-box">
      <img className={image_animation} src={url} />
    </div>
  );
}

export default Template_3;
