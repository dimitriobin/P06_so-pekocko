import { useState, useEffect } from 'react';
import SaucesDataService from '../utils/SaucesServices';
import { Sauce } from '../types/Sauce';

import SauceCard from '../components/SauceCard';
import { AddSauceSection } from '../components/AddSauceSection';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { isAxiosError } from 'axios';

function SaucesList() {
  const [sauces, setSauces] = useState<Sauce[]>([]);
  const { handleLogout, currentUser } = useAuth();

  useEffect(() => {
    retrieveSauces();
  }, []);

  const retrieveSauces = async () => {
    try {
      const response = await SaucesDataService.getAll();
      setSauces(response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        handleLogout();
      }
      console.error(error);
    }
  };

  const isSauceDisliked = (sauceId: number): boolean => {
    const sauce = sauces.find((sauce) => sauce.id === sauceId);
    return sauce ? sauce.dislikes.some((i) => i.user.id === currentUser?.id) : false;
  };

  const isSauceLiked = (sauceId: number): boolean => {
    const sauce = sauces.find((sauce) => sauce.id === sauceId);
    return sauce ? sauce.likes.some((i) => i.user.id === currentUser?.id) : false;
  };

  const handleLike = async (id: number) => {
    try {
      const isAlreadyLiked = isSauceLiked(id);
      const isAlreadyDisliked = isSauceDisliked(id);
      const payload = {
        sauceId: id,
        userId: currentUser?.id as number
      };
      if (isAlreadyLiked) {
        await SaucesDataService.unLikeOne(payload);
      } else {
        if (isAlreadyDisliked) {
          // undislike + like
          await SaucesDataService.unDislikeOne(payload);
          await SaucesDataService.likeOne(payload);
        } else {
          // like
          await SaucesDataService.likeOne(payload);
        }
      }
      const hydratedSauces = sauces.map((sauce) => {
        if (sauce.id === id) {
          return {
            ...sauce,
            likes: isAlreadyLiked
              ? sauce.likes.filter((like) => like.user.id !== currentUser?.id)
              : [
                  ...sauce.likes,
                  {
                    user: {
                      id: currentUser?.id as number,
                      name: currentUser?.name as string
                    }
                  }
                ],
            dislikes: isAlreadyDisliked
              ? sauce.dislikes.filter((dislike) => dislike.user.id !== currentUser?.id)
              : sauce.dislikes,
            _count: {
              likes: isAlreadyLiked ? sauce._count.likes - 1 : sauce._count.likes + 1,
              dislikes: isAlreadyDisliked ? sauce._count.dislikes - 1 : sauce._count.dislikes
            }
          };
        } else {
          return sauce;
        }
      }, []);
      setSauces(hydratedSauces);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (id: number) => {
    try {
      const isAlreadyDisliked = isSauceDisliked(id);
      const isAlreadyLiked = isSauceLiked(id);
      const payload = {
        sauceId: id,
        userId: currentUser?.id as number
      };
      if (isAlreadyDisliked) {
        await SaucesDataService.unDislikeOne(payload);
      } else {
        if (isAlreadyLiked) {
          await SaucesDataService.unLikeOne(payload);
          await SaucesDataService.dislikeOne(payload);
        } else {
          await SaucesDataService.dislikeOne(payload);
        }
      }
      const hydratedSauces = sauces.map((sauce) => {
        if (sauce.id === id) {
          return {
            ...sauce,
            dislikes: isAlreadyDisliked
              ? sauce.dislikes.filter((dislike) => dislike.user.id !== currentUser?.id)
              : [
                  ...sauce.dislikes,
                  {
                    user: {
                      id: currentUser?.id as number,
                      name: currentUser?.name as string
                    }
                  }
                ],
            likes: isAlreadyLiked
              ? sauce.likes.filter((like) => like.user.id !== currentUser?.id)
              : sauce.likes,
            _count: {
              likes: isAlreadyLiked ? sauce._count.likes - 1 : sauce._count.likes,
              dislikes: isAlreadyDisliked ? sauce._count.dislikes - 1 : sauce._count.dislikes + 1
            }
          };
        } else {
          return sauce;
        }
      }, []);
      setSauces(hydratedSauces);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AddSauceSection handleNewSauce={(newSauce) => setSauces([newSauce, ...sauces])} />
      <Outlet />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sauces &&
          sauces.map((sauce) => (
            <SauceCard
              sauce={sauce}
              handleLike={() => handleLike(sauce.id)}
              handleDislike={() => handleDislike(sauce.id)}
              key={sauce.id}
            />
          ))}
      </div>
    </>
  );
}

export default SaucesList;
