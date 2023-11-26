import hot1 from '../assets/img/hot_rank_1.svg';
import hot2 from '../assets/img/hot_rank_2.svg';
import hot3 from '../assets/img/hot_rank_3.svg';
import hot4 from '../assets/img/hot_rank_4.svg';
import hot5 from '../assets/img/hot_rank_5.svg';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getOne } from '../utils/SaucesServices';
import { CreateSaucePayload, Sauce as ISauce } from '../types/Sauce';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { isAxiosError } from 'axios';
import sauceService from '../utils/SaucesServices';
import { Modal } from '../components/Modal';
import SauceForm from '../components/SauceForm';

// import AddSauce from "./AddSauce";

const imageObject: Record<string, string> = {
  hot1,
  hot2,
  hot3,
  hot4,
  hot5
};

const initSauce: ISauce = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  description: '',
  heat: 1,
  dislikes: [],
  likes: [],
  imageUrl: '',
  mainPepper: '',
  manufacturer: '',
  name: '',
  userId: 0,
  _count: {
    dislikes: 0,
    likes: 0
  }
};

function Sauce() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser, handleLogout } = useAuth();

  const [sauce, setSauce] = useState(initSauce);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser?.id) {
      navigate('/');
    } else {
      getSauce();
    }
  }, []);

  const getSauce = async () => {
    try {
      const sauce = await getOne(id as string);
      setSauce(sauce);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        handleLogout();
      }
      console.error(error);
    }
  };

  const heatImage = () => {
    const k = `hot${sauce.heat}`;
    return imageObject[k];
  };

  const onEditChange = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (data: Partial<CreateSaucePayload>) => {
    try {
      const formdata = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v) {
          if (k === 'imageUrl') {
            formdata.append('imageUrl', v as File);
          } else {
            formdata.append(k, v.toString());
          }
        }
      });
      const updated = await sauceService.updateOne(sauce.id, formdata);
      setSauce(updated);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      const deleted = await sauceService.deleteOne(sauce.id);
      if (deleted) navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="px-10">
      <Modal open={isEditing} closeModal={() => setIsEditing(false)}>
        <SauceForm onDataSubmit={handleUpdate} value={sauce} />
      </Modal>
      <Link to={'/'} className="btn btn-link">
        <RiArrowGoBackFill className="w-6 h-6" />
        Back to all
      </Link>
      <img
        src={'http://localhost:3000/' + sauce.imageUrl}
        alt={sauce.description}
        className="w-full aspect-video object-cover"></img>
      {/* {edit && <AddSauce value={sauce} showSauceForm={onEditChange} onDataSubmit={updateSauce} />} */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-6xl font-bold mt-5 mb-2">{sauce.name}</h1>
          <h2 className=" text-3xl font-medium mb-2">Made with {sauce.mainPepper}</h2>
          <p className="italic text-xl mb-3">by {sauce.manufacturer}</p>
          <p>{sauce.description}</p>
          {currentUser && sauce.userId === currentUser.id && (
            <div className="my-4">
              <button
                onClick={onEditChange}
                className="bg-yellow-500 p-3 font-medium rounded-full shadow-lg my-2 mr-2 text-white">
                update
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 p-3 font-medium rounded-full shadow-lg my-2 text-white">
                delete
              </button>
            </div>
          )}
        </div>
        <img
          src={heatImage()}
          alt={`Cette sauce a obtenu la note de ${sauce.heat} sur 5`}
          className="h-20 w-20 p-2 rounded-full bg-white border shadow-lg"
        />
      </div>
    </section>
  );
}

export default Sauce;
