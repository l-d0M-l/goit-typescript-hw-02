import css from "./ImageCard.module.css";
import ImageI from "../App/AppTypes";
import React from "react";
interface ImageCardProps {
  cardInfo: ImageI;
  onImageClick: (image: ImageI) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ cardInfo, onImageClick }) => {
  return (
    //select the clicked image for modal
    <div onClick={() => onImageClick(cardInfo)}>
      <img
        src={cardInfo.urls.small}
        alt={cardInfo.description}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
