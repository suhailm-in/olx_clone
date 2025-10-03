import React from 'react';

import Signup from '../Components/Signup/Signup';
import CustomHelmet from '../includes/CustomHelmet';

function SignupPage() {
  return (
    <div>
      <CustomHelmet
        title="Signup | OLX Clone"
        description="Buy and sell products easily"
      />
      <Signup />
    </div>
  );
}

export default SignupPage;
