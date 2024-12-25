import styles from "../../styles/FeatureContentList.module.css";
import FeaturedContentItem from "./FeaturedContentItem";
import { FeaturedContent } from '../../types';


interface FeaturedContentListProps {
  featuredContentList: FeaturedContent[];
}

const FeaturedContentList: React.FC<FeaturedContentListProps> = ({ featuredContentList }) => {
  if (featuredContentList.length === 0) {
    return <p>No featured content available.</p>;
  }

  return (
    <div className={styles.featureContentContainer}>
      {featuredContentList.map((featuredContentItem) => (
        <FeaturedContentItem
          key={featuredContentItem.id}
          featuredContentItem={featuredContentItem}
        />
      ))}
    </div>
  );
};

export default FeaturedContentList;
