import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import CustomHelmet from '../includes/CustomHelmet';

const CreatePage = () => {
  return (
    <Fragment>
      <CustomHelmet
        title="Sell | OLX Clone"
        description="Buy and sell products easily"
      />
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
