import React from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import CustomHelmet from '../includes/CustomHelmet';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <CustomHelmet
        title="Home | OLX Clone"
        description="Buy and sell products easily"
      />
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
