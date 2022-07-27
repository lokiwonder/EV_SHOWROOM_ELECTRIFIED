import { useEffect, useState } from "react";
import {
  useAssetsStore,
  useElectrifiedPageStore,
  useElectrifiedSelectStore,
  useGestureStore,
} from "src/stores";
import { Template_2_item } from "src/interfaces";

import "./style.css";

function Template_2() {
  const { electrified_page } = useElectrifiedPageStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { gesture, change } = useGestureStore();
  const { asset_list } = useAssetsStore();

  // description: content component //
  const Template_2_item = (props: any) => {
    const [url, setUrl] = useState<string>("");
    const [img_animation, setImageAnimation] = useState<string>("hidden");
    const [commnet_animation, setCommentAnimation] =
      useState<string>("display-none");
    const { data } = props;

    const setURI = () => {
      for (const item of asset_list)
        if (
          item.electrified === selected_electrified &&
          item.classification === electrified_page.page_class &&
          item.sequence === electrified_page.page_present
        ) {
          setUrl(item.image_url[data.idx]);
          break;
        }
    };

    useEffect(() => {
      // description: 이미지 로드 완료 후 화면 출력 //
      setURI();
      if (gesture && change) {
        setImageAnimation("template-2-img template-2-img-animation");
        setTimeout(() => {
          setCommentAnimation(
            "b2 template-2-comment template-2-comment-animation"
          );
        }, 300);
      } else {
        setImageAnimation("template-2-img");
        setCommentAnimation("b2 template-2-comment");
      }
    }, []);

    return (
      <div className="template-2-item">
        <img className={img_animation} src={url} />
        <p className={commnet_animation}>{data.content.comment}</p>
      </div>
    );
  };

  return (
    <div className="template-2-container">
      <div>
        {electrified_page.page.contents.length !== 0 &&
          electrified_page.page.contents.map(
            (content: Template_2_item, i: number) => (
              <Template_2_item data={{content, idx: i}} />
            )
          )}
      </div>
    </div>
  );
}

export default Template_2;
