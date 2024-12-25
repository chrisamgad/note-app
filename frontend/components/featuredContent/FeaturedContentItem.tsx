import styles from "../../styles/FeatureContentItem.module.css";
import { FeaturedContent } from '../../types'; // Adjust the path according to your project structure

interface FeaturedContentItemProps {
  featuredContentItem: FeaturedContent;
}

const FeaturedContentItem: React.FC<FeaturedContentItemProps> = ({ featuredContentItem }) => {
  return (
    <div className={styles.featuredContentItem}>
      <h3>
        <b>{featuredContentItem.title}</b>
      </h3>
      <p>{featuredContentItem.content}</p>
    </div>
  );
};

export default FeaturedContentItem;
