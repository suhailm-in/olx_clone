import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import CustomSEO from '../includes/CustomSEO';

const CreatePage = () => {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sell Product | OLX Clone",
    "url": window.location.href,
    "description": "Sell your products easily on OLX Clone. Add product details, images, and price to start selling."
  };

  return (
    <Fragment>
      <CustomSEO
        title="Sell Product | OLX Clone"
        description="Sell your products easily on OLX Clone. Add product details, images, and price to start selling."
        url={window.location.href}
        type="website"
        jsonLd={jsonLd}
      />
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
