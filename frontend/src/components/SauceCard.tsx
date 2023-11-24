/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import hot1 from '../assets/img/hot_rank_1.svg';
import hot2 from '../assets/img/hot_rank_2.svg';
import hot3 from '../assets/img/hot_rank_3.svg';
import hot4 from '../assets/img/hot_rank_4.svg';
import hot5 from '../assets/img/hot_rank_5.svg';
import { Link } from 'react-router-dom';
import { Sauce } from '../types/Sauce';
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa6';
import { useAuth } from '../hooks/useAuth';

const imageObject: Record<string, string> = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5
};

function SauceCard({
  sauce,
  handleLike,
  handleDislike
}: {
  sauce: Sauce;
  handleLike: () => void;
  handleDislike: () => void;
}) {
  const { currentUser } = useAuth();

  const isAlreadyLiked = sauce.likes.some((i) => i.user.id === currentUser?.id);

  const isAlreadyDisliked = sauce.dislikes.some((i) => i.user.id === currentUser?.id);

  return (
    <article className="card shadow-lg relative">
      <figure>
        <img
          src={`https://picsum.photos/600/400?random=${sauce.id}`}
          alt={sauce.description}
          className="w-full aspect-video object-cover"
        />
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

        <div className="card-actions justify-around">
          <div className="indicator">
            <span className="indicator-item">
              <div
                className={sauce._count.likes > 0 && 'tooltip'}
                data-tip={sauce.likes.map((i) => i.user.name).join(', ')}>
                <span className="badge badge-accent">{sauce._count.likes}</span>
              </div>
            </span>
            <button
              onClick={handleLike}
              className={`btn btn-circle btn-ghost ${
                isAlreadyLiked && ''
              } z-50 hover:bg-transparent`}>
              {isAlreadyLiked ? (
                <FaThumbsUp className="w-10 h-10" color="#65C3C8" />
              ) : (
                <FaRegThumbsUp className="w-10 h-10" />
              )}
            </button>
          </div>
          <div className="indicator">
            <span className="indicator-item">
              <div
                className={sauce._count.dislikes > 0 && 'tooltip'}
                data-tip={sauce.dislikes.map((i) => i.user.name).join(', ')}>
                <span className="badge badge-accent">{sauce._count.dislikes}</span>
              </div>
            </span>
            <button
              onClick={handleDislike}
              className={`btn btn-circle btn-ghost ${
                isAlreadyDisliked && ''
              } z-50 hover:bg-transparent`}>
              {isAlreadyDisliked ? (
                <FaThumbsDown className="w-10 h-10" color="#65C3C8" />
              ) : (
                <FaRegThumbsDown className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Link to={`/sauces/${sauce.id}`} className="absolute left-0 top-0 w-full h-full" />
    </article>
  );
}

export default SauceCard;
