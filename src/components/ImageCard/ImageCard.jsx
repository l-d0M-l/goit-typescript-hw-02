import css from "./ImageCard.module.css";

function ImageCard({ cardInfo, onImageClick }) {
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
}

export default ImageCard;
