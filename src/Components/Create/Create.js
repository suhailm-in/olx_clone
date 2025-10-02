import React, { useState, useContext, useRef } from "react";
import "./Create.css";
import Header from "../Header/Header";

import { db } from "../../firebase/Config";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/AuthContext";

import { supabase } from "../../superbase/supabaseClient";
import Loading from "../Loading/Loading";

const Create = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const { user } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const date = new Date();

    // handle submit
    const handleSubmit = () => {
        if (!name || !category || !price || !image) {
            setMsg("Please fill all fields and choose an image.");
            return;
        }

        setLoading(true);
        setMsg("");

        // create a reference in storage
        // const imageRef = ref(storage, `/images/${image.name}`);

        // Unique filename
        const fileName = `${Date.now()}-${image.name}`;

        // Upload to Supabase
        supabase.storage
            .from("olx_uploads")
            .upload(fileName, image)
            .then(({ data, error }) => {
                if (error) {
                    throw error;
                }

                // Get public URL
                return supabase.storage
                    .from("olx_uploads")
                    .getPublicUrl(fileName);
            })
            .then(({ data }) => {
                const imageUrl = data.publicUrl;

                // Save product data in Firestore
                return addDoc(collection(db, "products"), {
                    name,
                    category,
                    price,
                    url: imageUrl,
                    userId: user ? user.uid : "guest",
                    createdAt: date.toDateString(),
                });
            })
            .then(() => {
                setMsg("Product uploaded successfully!");
                setName("");
                setCategory("");
                setPrice("");
                setImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            })
            .catch((err) => {
                console.error("Upload error:", err.message);
                setMsg(`${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });

        // upload the image
        // uploadBytes(imageRef, image)
        //     .then(() => {
        //         // get the download URL
        //         return getDownloadURL(imageRef);
        //     })
    };

    return (
        <>
            <Header />
            <section className="creatcard">
                {loading && <Loading />}
                <div className="centerDiv">
                    <h2>Create New Product</h2>

                    {msg && <p className="msg">{msg}</p>}

                    <label>Name</label>
                    <input
                        className="input creatinput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Category</label>
                    <input
                        className="input creatinput"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <label>Price</label>
                    <input
                        className="input creatinput"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    {image && (
                        <img
                            alt="preview"
                            width="200px"
                            height="200px"
                            src={URL.createObjectURL(image)}
                        />
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button
                        onClick={handleSubmit}
                        className="uploadBtn"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload & Submit"}
                    </button>
                </div>
            </section>
        </>
    );
};

export default Create;
