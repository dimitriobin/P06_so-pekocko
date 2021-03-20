import hot1 from "../assets/img/hot_rank_1.svg";
import hot2 from "../assets/img/hot_rank_2.svg";
import hot3 from "../assets/img/hot_rank_3.svg";
import hot4 from "../assets/img/hot_rank_4.svg";
import hot5 from "../assets/img/hot_rank_5.svg";

const imageObject = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5,
};

function SauceCard({ rank }) {
  return (
    <article className="sauce-card relative overflow-hidden border rounded-3xl h-96 shadow-lg cursor-pointer">
      <img
        src="https://picsum.photos/800"
        alt="La super sauce piquante"
        className="w-full h-auto"
      ></img>
      <div className="p-5 absolute bottom-0 bg-white h-2/5 w-full flex flex-col justify-center items-center text-center">
        <img
          src={imageObject[`hot${rank}`]}
          alt={`Cette sauce a obtenu la note de ${rank} sur 5`}
          className="inline h-20 w-20 p-2 rounded-full bg-white border shadow-lg absolute"
        ></img>
        <h2
          className="text-lg font-semibold uppercase truncate w-full"
          title="full text"
        >
          Nom de la sauce piquante mega super forte de malade mental truc de fou
          super long pour le test
        </h2>
        <p className="italic">by dimitri obin</p>
      </div>
    </article>
  );
}

export default SauceCard;