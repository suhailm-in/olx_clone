import { useContext, useState } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

import { BsChat } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AuthContext } from "../../store/AuthContext";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Config";
import { Link } from "react-router-dom";

function Header() {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const profileImage = "https://i.pravatar.cc/150?img=1"; // Example placeholder
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Logout error:", error.message);
            });
    };

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                {/* Brand */}
                <Link to="/" className="brandName">
                    <OlxLogo />
                </Link>

                {/* Location Search */}
                <div className="placeSearch">
                    <Search />
                    <input type="text" />
                    <Arrow />
                </div>

                {/* Product Search */}
                <div className="productSearch">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Find car, mobile phone and more..."
                        />
                    </div>
                    <div className="searchAction">
                        <Search color="#ffffff" />
                    </div>
                </div>

                {/* Language */}
                <div className="language">
                    <span>ENGLISH</span>
                    <Arrow />
                </div>

                {/* Conditional Icons */}
                {user ? (
                    <>
                        <button className="icon-btn">
                            <BsChat size={22} />
                        </button>
                        <button className="icon-btn">
                            <IoMdNotificationsOutline size={22} />
                        </button>

                        {/* Profile with dropdown */}
                        <div className="profileWrapper">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="profileImage"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />

                            {isMenuOpen && (
                                <div className="dropdownMenu">
                                    <div className="dropdownHeader">
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="dropdownProfileImage"
                                        />
                                        <div>
                                            <h4>{user?.displayName}</h4>
                                        </div>
                                    </div>

                                    <button className="dropdownBtn">
                                        View & Edit Profile
                                    </button>

                                    <ul>
                                        <li>My Ads</li>
                                        <li>Buy Business Packages</li>
                                        <li>View Cart</li>
                                        <li>Bought Packages & Billing</li>
                                        <li>Become an Elite Buyer</li>
                                        <li>Help</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="login-btn">Login</Link>
                )}

                {/* Sell Button */}
                <div className="sellMenu">
                    <SellButton />
                    <Link to="/create" className="sellMenuContent">
                        <SellButtonPlus />
                        <span>SELL</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
