import React, { useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
// import { FireBaseContext } from "../../store/FirebaseContext";

function Posts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Get products from Firestore
        getDocs(collection(db, "products"))
            .then((snapshot) => {
                const allProducts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(allProducts);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {products.map((product) => (
                        <Link to={`/view/${product.id}`} className="card" key={product.id}>
                            <div className="favorite">
                                <Heart />
                            </div>
                            <div className="image">
                                <img src={product.url} alt={product.name} />
                            </div>
                            <div className="content">
                                <p className="rate">&#x20B9; {product.price}</p>
                                <span className="kilometer">
                                    {product.category}
                                </span>
                                <p className="name">{product.name}</p>
                            </div>
                            <div className="date">
                                <span>{product.createdAt}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../Images/R15V3.jpg" alt="R15V3" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
