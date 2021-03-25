import { useState, useEffect } from "react";
import hot1 from "../assets/img/hot_rank_1.svg";
import hot2 from "../assets/img/hot_rank_2.svg";
import hot3 from "../assets/img/hot_rank_3.svg";
import hot4 from "../assets/img/hot_rank_4.svg";
import hot5 from "../assets/img/hot_rank_5.svg";
import { Link } from "react-router-dom";

import SauceDataService from "../services/SaucesServices";
import AuthDataService from "../services/AuthServices";

const userId = AuthDataService.getCurrentUser().userId;

const imageObject = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5,
};

function Sauce(props) {
  const initialSauceState = {
    description: "",
    dislikes: "",
    heat: "",
    imageUrl: null,
    likes: "",
    mainPepper: "",
    manufacturer: "",
    name: "",
    userId,
    usersDisliked: [],
    usersLiked: [],
  };

  const [sauce, setSauce] = useState(initialSauceState);

  const getSauce = (id) => {
    SauceDataService.getOne(id)
      .then((response) => {
        setSauce(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSauce(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <main className="flex flex-col lg:flex-row justify-start lg:justify-center items-center px-10">
      <Link to={"/"}>
        <i className="fas fa-arrow-left fa-3x absolute top-5 md:top-10 lg:top-20 left-5 md:left-10 lg:left-20"></i>
      </Link>
      <div className="relative">
        <img
          src={sauce.imageUrl}
          alt={sauce.description}
          className="w-full max-w-lg rounded-3xl h-auto"
        ></img>
        <img
          src={imageObject[`hot${sauce.heat}`]}
          alt={`Cette sauce a obtenu la note de ${sauce.heat} sur 5`}
          className="h-20 w-20 p-2 rounded-full bg-white border shadow-lg absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3"
        ></img>
      </div>
      <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-10">
        <h1 className="text-6xl font-bold mt-5 mb-2">{sauce.name}</h1>
        <p className="italic text-xl mb-3">by {sauce.manufacturer}</p>
        <p>{sauce.description}</p>
        {sauce.userId === userId && (
          <div className="my-4">
            <button className="bg-yellow-500 p-3 font-medium rounded-full shadow-lg my-2 mr-2 text-white">
              update
            </button>
            <button className="bg-red-500 p-3 font-medium rounded-full shadow-lg my-2 text-white">
              delete
            </button>
          </div>
        )}
        <div className="flex justify-evenly lg:justify-start items-center">
          <button aria-label="Like the sauce">
            <i className="far fa-thumbs-up fa-4x lg:mx-5"></i>
          </button>
          <button aria-label="Dislike the sauce">
            <i className="far fa-thumbs-down fa-4x lg:mx-5"></i>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Sauce;
