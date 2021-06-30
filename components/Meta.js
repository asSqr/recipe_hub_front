import Head from 'next/head';
import { appOrigin } from '../utils/constants';

const Meta = ({ image_url, title, description }) => {
  return (
    <Head>
      <title>{title || 'Recipe Hub'}</title>
      <meta property="og:url" content={`${appOrigin}`} />
      <meta property="og:image" content={image_url} />
      <meta property="og:site_name" content="Recipe Hub" />
      <meta property="og:title" content={title || "Recipe Hub"} />
      <meta property="og:description" content={description || "Recipe Hub (Github for Cooking)"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Team 3 Apology" />
      <meta name="description" content={description || "Recipe Hub (Github for Cooking)"} />
    </Head>
  );
};

export default Meta;