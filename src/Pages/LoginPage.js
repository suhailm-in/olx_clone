import React from 'react';
import Login from '../Components/Login/Login';
import CustomSEO from '../includes/CustomSEO';

function LoginPage() {

  // JSON-LD structured data for Home (like a Website)
    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Login | OLX Clone",
    "url": window.location.href,
    "description": "Login to your OLX Clone account to buy and sell products easily."
  };

  return (
    <div>
      <CustomSEO
        title="Login | OLX Clone"
        description="Login to your OLX Clone account to buy and sell products easily."
        url={window.location.href}
        type="website"
        jsonLd={jsonLd}
      />
      <Login />
    </div>
  );
}

export default LoginPage;
