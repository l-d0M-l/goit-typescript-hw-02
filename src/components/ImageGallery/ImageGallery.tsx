import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import ImageI from "../App/AppTypes";

interface ImageGalleryProps {
  articles: ImageI[];
  onImageClick: (image: ImageI) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  articles,
  onImageClick,
}) => {
  return (
    <ul className={css.list}>
      {articles.map((element: ImageI) => (
        <li key={element.id}>
          <ImageCard cardInfo={element} onImageClick={onImageClick}></ImageCard>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
