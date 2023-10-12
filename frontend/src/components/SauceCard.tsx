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

function SauceCard({ sauce }) {
  return (
    <Link to={`/sauce/${sauce._id}`}>
      <article className="sauce-card relative overflow-hidden border rounded-3xl h-96 shadow-lg cursor-pointer">
        <img
          src={sauce.imageUrl}
          alt={sauce.description}
          className="w-full h-auto"
        ></img>
        <div className="p-5 absolute bottom-0 bg-white h-2/5 w-full flex flex-col justify-center items-center text-center">
          <img
            src={imageObject[`hot${sauce.heat}`]}
            alt={`Cette sauce a obtenu la note de ${sauce.heat} sur 5`}
            className="inline h-20 w-20 p-2 rounded-full bg-white border shadow-lg absolute"
          ></img>
          <h2
            className="text-lg font-semibold uppercase truncate w-full"
            title="full text"
          >
            {sauce.name}
          </h2>
          <p className="italic">by {sauce.manufacturer}</p>
        </div>
      </article>
    </Link>
  );
}

export default SauceCard;
