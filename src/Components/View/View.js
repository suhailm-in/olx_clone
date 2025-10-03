import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./View.css";

import { db } from "../../firebase/Config";
import { doc, getDoc } from "firebase/firestore";
import CustomSEO from "../../includes/CustomSEO";
import Loading from "../Loading/Loading";

function View() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productRef = doc(db, "products", id);

        // Fetch product data
        getDoc(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const productData = snapshot.data();
                    setProduct(productData);

                    // Fetch seller details from "users" collection using userId
                    const sellerRef = doc(db, "users", productData.userId);
                    return getDoc(sellerRef);
                } else {
                    throw new Error("Product not found");
                }
            })
            .then((sellerSnapshot) => {
                if (sellerSnapshot.exists()) {
                    setSeller(sellerSnapshot.data());
                } else {
                    setSeller({ name: "No name", phone: "Not available" });
                }
            })
            .catch((err) => console.error("Error fetching data:", err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return <p>Product not found.</p>;

    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.url,
    "description": product.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price,
    },
  };

    return (
        <>
            <CustomSEO
                title={`View | OLX Clone | ${product.name}`}
                description={`Buy and sell ${product.name} easily`}
                url={window.location.href}
                image={product.url}
                type="product"
                jsonLd={jsonLd}
            />
            <div className="viewParentDiv">
                <div className="imageShowDiv">
                    <img src={product.url} alt={product.name} />
                </div>
                <div className="rightSection">
                    <div className="productDetails">
                        <p>&#x20B9; {product.price}</p>
                        <span>{product.name}</span>
                        <p>{product.category}</p>
                        <span>{product.createdAt}</span>
                    </div>
                    <div className="contactDetails">
                        <p>Seller Details</p>
                        <p>{seller?.username || "No name"}</p>
                        <p>{seller ? seller.phone : "Not available"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default View;
