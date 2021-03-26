import { useState, useEffect } from "react";
import hot1 from "../assets/img/hot_rank_1.svg";
import hot2 from "../assets/img/hot_rank_2.svg";
import hot3 from "../assets/img/hot_rank_3.svg";
import hot4 from "../assets/img/hot_rank_4.svg";
import hot5 from "../assets/img/hot_rank_5.svg";
import { Link, Redirect } from "react-router-dom";

import SauceDataService from "../services/SaucesServices";
import AuthDataService from "../services/AuthServices";

import AddSauce from "./AddSauce";

const imageObject = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5,
};

function Sauce(props) {
  const userId = AuthDataService.getCurrentUser().userId;

  const initialSauceState = {
    description: "",
    heat: "",
    imageUrl: null,
    mainPepper: "",
    manufacturer: "",
    name: "",
    userId,
  };

  const [sauce, setSauce] = useState(initialSauceState);
  const [edit, setEdit] = useState(false);

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

  const onEditChange = () => {
    setEdit(!edit);
  };

  const updateSauce = (data) => {
    SauceDataService.updateOne(props.match.params.id, data)
      .then((response) => {
        setSauce(response.data);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = () => {
    SauceDataService.deleteOne(props.match.params.id)
      .then((response) => {
        setSauce(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col lg:flex-row justify-start lg:justify-center items-center px-10">
      {!sauce && <Redirect to="/" />}
      <Link to={"/"}>
        <i className="fas fa-arrow-left fa-3x absolute top-5 md:top-10 lg:top-20 left-5 md:left-10 lg:left-20"></i>
      </Link>
      {edit && (
        <AddSauce
          value={sauce}
          showSauceForm={onEditChange}
          onDataSubmit={updateSauce}
        />
      )}
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
        <h2 className=" text-3xl font-medium mb-2">
          Made with {sauce.mainPepper}
        </h2>
        <p className="italic text-xl mb-3">by {sauce.manufacturer}</p>
        <p>{sauce.description}</p>
        {sauce.userId === userId && (
          <div className="my-4">
            <button
              onClick={onEditChange}
              className="bg-yellow-500 p-3 font-medium rounded-full shadow-lg my-2 mr-2 text-white"
            >
              update
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 p-3 font-medium rounded-full shadow-lg my-2 text-white"
            >
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
