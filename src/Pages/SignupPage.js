import React from "react";

import Signup from "../Components/Signup/Signup";
import CustomSEO from "../includes/CustomSEO";

function SignupPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Signup | OLX Clone",
        url: window.location.href,
        description:
            "Create a new account on OLX Clone to start buying and selling products.",
    };

    return (
        <div>
            <CustomSEO
                title="Signup | OLX Clone"
                description="Create a new account on OLX Clone to start buying and selling products."
                url={window.location.href}
                type="website"
                jsonLd={jsonLd}
            />
            <Signup />
        </div>
    );
}

export default SignupPage;
