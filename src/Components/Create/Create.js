import React from "react";
import "./Create.css";
import Header from "../Header/Header";

const Create = () => {
    return (
        <>
            <Header />
            <section>
                <div className="centerDiv">
                    <form>
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            id="fname"
                            name="Name"
                            defaultValue="John"
                        />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            id="fname"
                            name="category"
                            defaultValue="John"
                        />
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input
                            className="input"
                            type="number"
                            id="fname"
                            name="Price"
                        />
                        <br />
                    </form>
                    <br />
                    <img alt="Posts" width="200px" height="200px" src="no"></img>
                    <form>
                        <br />
                        <input type="file" />
                        <br />
                        <button className="uploadBtn">upload and Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Create;
