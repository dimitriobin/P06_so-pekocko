import hot1 from "../assets/img/hot_rank_1.svg";
import hot2 from "../assets/img/hot_rank_2.svg";
import hot3 from "../assets/img/hot_rank_3.svg";
import hot4 from "../assets/img/hot_rank_4.svg";
import hot5 from "../assets/img/hot_rank_5.svg";
import { Link } from "react-router-dom";

const imageObject = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5,
};

function Sauce() {
  const sauce = {
    rank: 5,
    id: Math.floor(Math.random()),
  };
  return (
    <main className="flex flex-col lg:flex-row justify-start lg:justify-center items-center px-10">
      <Link to={"/"}>
        <i className="fas fa-arrow-left fa-3x absolute top-5 md:top-10 lg:top-20 left-5 md:left-10 lg:left-20"></i>
      </Link>
      <div className="relative">
        <img
          src="https://picsum.photos/800"
          alt="La super sauce piquante"
          className="w-full max-w-lg rounded-3xl h-auto"
        ></img>
        <img
          src={imageObject[`hot${sauce.rank}`]}
          alt={`Cette sauce a obtenu la note de ${sauce.rank} sur 5`}
          className="h-20 w-20 p-2 rounded-full bg-white border shadow-lg absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3"
        ></img>
      </div>
      <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-10">
        <h1 className="text-6xl font-bold mt-5 mb-2">La sauce piquante</h1>
        <p className="italic text-xl mb-3">by dimitri obin</p>
        <p>
          lorem ipsum dolore blabla lorem ipsum dolore blabla lorem ipsum dolore
          blabla lorem ipsum dolore blabla lorem ipsum dolore blabla lorem ipsum
          dolore blabla lorem ipsum dolore blabla lorem ipsum dolore blabla
          lorem ipsum dolore blabla lorem ipsum dolore blabla lorem ipsum dolore
          blabla lorem ipsum dolore blabla
        </p>
        <div className="flex justify-evenly lg:justify-start items-center mt-8">
          <button>
            <i className="far fa-thumbs-up fa-4x lg:mx-5"></i>
          </button>
          <button>
            <i className="far fa-thumbs-down fa-4x lg:mx-5"></i>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Sauce;
