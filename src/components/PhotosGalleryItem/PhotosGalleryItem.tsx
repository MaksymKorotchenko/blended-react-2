import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface GridItemProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export default function PhotosGalleryItem({ photo, onClick }: GridItemProps) {
  console.log(photo);

  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: photo.avg_color,
        borderColor: photo.avg_color,
      }}
      onClick={() => onClick(photo)}
    >
      <img src={photo.src.large} alt={photo.alt} />
    </div>
  );
}
