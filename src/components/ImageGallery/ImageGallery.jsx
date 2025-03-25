import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ articles, onImageClick }) {
  return (
    <ul className={css.list}>
      {articles.map((element) => (
        <li key={element.id}>
          <ImageCard cardInfo={element} onImageClick={onImageClick}></ImageCard>
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
