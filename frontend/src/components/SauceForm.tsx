// import { useState } from 'react';

import { useEffect /* , useState */ } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CreateSaucePayload, Sauce } from '../types/Sauce';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddSauceSchema, addSauceSchema } from '../utils/formValidation';

interface Props {
  value?: Sauce;
  onDataSubmit: (newSauceData: CreateSaucePayload) => void;
}

function SauceForm({ onDataSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<AddSauceSchema>({
    resolver: zodResolver(addSauceSchema)
  });
  const { currentUser } = useAuth();
  const userId = currentUser?.id as number;

  //   const initialSauce = {
  //     userId,
  //     name: value ? value.name : '',
  //     manufacturer: value ? value.manufacturer : '',
  //     description: value ? value.description : '',
  //     mainPepper: value ? value.mainPepper : '',
  //     imageUrl: value ? value.imageUrl : null,
  //     heat: value ? value.heat : 0
  //   };
  //   const [sauce, setSauce] = useState(initialSauce);
  //   const [preview, setPreview] = useState(value ? value.imageUrl : undefined);

  const handleFormSubmit = (data: AddSauceSchema) => {
    onDataSubmit({ userId, ...data, imageUrl: '' });
    //     props.onDataSubmit(fd);
    //     props.showSauceForm(false);
  };

  //   const handleChange = (e) => {
  //     if (e.target.name === "imageUrl") {
  //       setSauce({
  //         ...sauce,
  //         imageUrl: e.target.files[0],
  //       });
  //       setPreview(URL.createObjectURL(e.target.files[0]));
  //     } else {
  //       setSauce({
  //         ...sauce,
  //         [e.target.name]: e.target.value,
  //       });
  //     }
  //   };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-control w-full mb-2">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`input input-bordered w-full ${errors.name && 'input-error'}`}
        />
        {errors.name && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.name.message}</span>
        )}
      </div>

      <div className="form-control w-full mb-2">
        <label htmlFor="manufacturer" className="label">
          <span className="label-text">Manufacturer</span>
        </label>
        <input
          id="manufacturer"
          type="text"
          {...register('manufacturer')}
          className={`input input-bordered w-full ${errors.manufacturer && 'input-error'}`}
        />
        {errors.manufacturer && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.manufacturer.message}</span>
        )}
      </div>

      <div className="form-control w-full mb-2">
        <label htmlFor="description" className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          id="description"
          type="text"
          {...register('description')}
          className={`input input-bordered w-full ${errors.description && 'input-error'}`}
        />
        {errors.description && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.description.message}</span>
        )}
      </div>

      <div className="form-control w-full mb-2">
        <label htmlFor="mainPepper" className="label">
          <span className="label-text">Main ingredient</span>
        </label>
        <input
          id="mainPepper"
          type="text"
          {...register('mainPepper')}
          className={`input input-bordered w-full ${errors.mainPepper && 'input-error'}`}
        />
        {errors.mainPepper && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.mainPepper.message}</span>
        )}
      </div>

      {/* {sauce.imageUrl ? (
        <label
          htmlFor="image"
          className="w-28 h-28 rounded-full font-medium cursor-pointer mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none transition-all">
          <img
            src={preview}
            alt="Preview of you sauce"
            className="flex w-28 h-28 rounded-full mb-1 cursor-pointer flex-col justify-center items-center border-2 border-black hover:opacity-90 focus:outline-none transition-all"
          />
        </label>
      ) : (
        <label
          htmlFor="image"
          className="w-28 h-28 rounded-full font-medium cursor-pointer mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none transition-all">
          <span className="flex text-center w-28 h-28 rounded-full mb-1 cursor-pointer flex-col justify-center items-center border-2 border-black hover:opacity-90 focus:outline-none transition-all">
            Add an image
          </span>
        </label>
      )}
      <input type="file" name="imageUrl" id="image" className="hidden" /> */}
      {/* <div className="form-control w-full mb-2">
        <label htmlFor="image" className="label">
          <span className="label-text">Image</span>
        </label>
        <input
          id="image"
          type="file"
          {...register('imageUrl')}
          className={`file-input file-input-bordered w-full ${errors.imageUrl && 'input-error'}`}
        />
        {errors.imageUrl && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.imageUrl.message}</span>
        )}
      </div> */}

      <div className="form-control w-full mb-2">
        <label htmlFor="heat" className="label">
          <span className="label-text">Hot rank</span>
        </label>
        <input
          id="heat"
          type="range"
          {...register('heat', {
            valueAsNumber: true
          })}
          min="1"
          max="5"
          className={`range range-xs ${errors.heat && 'input-error'}`}
        />
        {errors.heat && (
          <span className="label-text-alt text-error ml-4 mt-1">{errors.heat.message}</span>
        )}
      </div>

      <div className="w-full flex mt-10">
        <button type="submit" className="btn btn-wide btn-success text-white mx-auto">
          Add
        </button>
      </div>
    </form>
  );
}

export default SauceForm;
