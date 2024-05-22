import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  // to get the avatar in home after sign-in
  const { currentUser } = useSelector((state) => state.user);
  // for the searchterm in url
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // handle the search functionality after submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // this is for to have  track of the prevoius filters in search in url after click the header search functionality
    const urlParams = new URLSearchParams(window.location.search);
    // we are setting the new search term
    urlParams.set("searchTerm", searchTerm);
    // covert the search url to string because some numbers some are strings
    const searchQuery = urlParams.toString();
    // now navigate the user to the searchURL
    navigate(`/search?${searchQuery}`);
  };

  //update the searchTerm in header input according to the URL in search
  useEffect(() => {
    // get the search url
    const urlParams = new URLSearchParams(location.search);
    // get the search term from the searchURL
    const searchTermFromUrl = urlParams.get("searchTerm");

    // if there is a searchTerm add it to the searchTerm
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Vineland</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hiden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hiden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
