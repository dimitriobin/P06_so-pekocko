/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import hot1 from '../assets/img/hot_rank_1.svg';
import hot2 from '../assets/img/hot_rank_2.svg';
import hot3 from '../assets/img/hot_rank_3.svg';
import hot4 from '../assets/img/hot_rank_4.svg';
import hot5 from '../assets/img/hot_rank_5.svg';
import { Link } from 'react-router-dom';
import { Sauce } from '../types/Sauce';

const imageObject: Record<string, string> = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5
};

function SauceCard({ sauce }: { sauce: Sauce }) {
  return (
    <article className="card shadow-lg relative">
      <figure>
        <img src={sauce.imageUrl} alt={sauce.description} className="w-full aspect-video" />
      </figure>
      <div className="card-body indicator w-full">
        <span className="indicator-item right-[50%] translate-x-[50%]">
          <img
            src={imageObject[`hot${sauce.heat}`]}
            alt={`Cette sauce a obtenu la note de ${sauce.heat} sur 5`}
            className="h-10 w-10 p-1 rounded-full bg-white shadow-lg"></img>
        </span>
        <h2 className="card-title">{sauce.name}</h2>
        <p className="italic">by {sauce.manufacturer}</p>

        <div className="card-actions justify-end"></div>
      </div>
      <Link to={`/sauce/${sauce.id}`} className="absolute left-0 top-0 w-full h-full" />
    </article>
  );
}

export default SauceCard;
