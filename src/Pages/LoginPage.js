import React from 'react';
import Login from '../Components/Login/Login';
import CustomHelmet from '../includes/CustomHelmet';

function LoginPage() {
  return (
    <div>
      <CustomHelmet
        title="Login | OLX Clone"
        description="Buy and sell products easily"
      />
      <Login />
    </div>
  );
}

export default LoginPage;
