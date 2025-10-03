import React from "react";

import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";

import Posts from "../Components/Posts/Posts";
import Footer from "../Components/Footer/Footer";
import CustomSEO from "../includes/CustomSEO";

function Home(props) {

    // JSON-LD structured data for Home (like a Website)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "OLX Clone",
        url: window.location.href,
        description: "Buy and sell products easily on OLX Clone",
    };

    return (
        <div className="homeParentDiv">
            {/* Custom SEO for Home Page */}
            <CustomSEO
                title="OLX Clone | Buy & Sell Products Easily"
                description="OLX Clone lets you buy and sell cars, mobiles, electronics, and more."
                url={window.location.href}
                image="https://raw.githubusercontent.com/suhailm-in/olx_clone/master/screenshots/Screenshot_home.png" // Optional OG image
                type="website"
                jsonLd={jsonLd}
            />
            <Header />
            <Banner />
            <Posts />
            <Footer />
        </div>
    );
}

export default Home;
