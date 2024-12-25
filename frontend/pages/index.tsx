import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head'
import FeaturedContentList from '../components/featuredContent/FeaturedContentList';
import { fetchFeaturedContent } from '../services/api/featuredContent';
import { FeaturedContent } from '../types';


interface HomeProps {
  featuredContentList: FeaturedContent[];
}

const Home: NextPage<HomeProps> = ({ featuredContentList }) => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <div><b>Featured Content (using SSG):</b></div>
      <FeaturedContentList featuredContentList={featuredContentList} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {

    const featuredContentList = await fetchFeaturedContent();

    return {
      props: {
        featuredContentList,
      },
    };
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return {
      props: {
        featuredContentList: [],
      },
    };
  }
};