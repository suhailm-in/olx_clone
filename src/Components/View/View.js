import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./View.css";

import { db } from "../../firebase/Config";
import { doc, getDoc } from "firebase/firestore";
import CustomHelmet from "../../includes/CustomHelmet";

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

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <>
        {/* Dynamic Helmet */}
      <CustomHelmet
        title={`View | OLX Clone | ${product.name}`}
        description={`Buy and sell products like ${product.name} easily on OLX Clone`}
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
                    <p>{seller ? seller.username : "Loading..."}</p>
                    <p>{seller ? seller.phone : "Loading..."}</p>
                </div>
            </div>
        </div>
        </>
    );
}
export default View;
