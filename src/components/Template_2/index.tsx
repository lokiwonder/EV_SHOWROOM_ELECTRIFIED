import { useEffect, useState } from "react";
import {
  useElectrifiedPageStore,
  useElectrifiedSelectStore,
  useGestureStore,
} from "src/stores";
import { imageURL } from "src/function";
import { Template_2_item } from "src/interfaces";

import "./style.css";

function Template_2() {
  const { electrified_page } = useElectrifiedPageStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { gesture, change } = useGestureStore();

  const [img_animation, setImageAnimation] = useState<string>("hidden");
  const [commnet_animation, setCommentAnimation] =
    useState<string>("display-none");

  // description: content component //
  const Template_2_item = (content: any) => {
    const [url, setURL] = useState<string>('');

    const setURI = async () => {
      const binary = await imageURL(selected_electrified, content.content.image);
      const blob = new Blob([binary], { type: "image/png" });
      setURL(URL.createObjectURL(blob));
    };

    useEffect(() => {
      // description: 이미지 로드 완료 후 화면 출력 //
      setURI().then(() => {
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
      });
    }, []);

    return (
      <div className="template-2-item">
        <img className={img_animation} src={url} />
        <p className={commnet_animation}>{content.content.comment}</p>
      </div>
    );
  };

  return (
    <div className="template-2-container">
      <div>
        {electrified_page.page.contents.length !== 0 &&
          electrified_page.page.contents.map((content: Template_2_item) => (
            <Template_2_item content={content} />
          ))}
      </div>
    </div>
  );
}

export default Template_2;
