import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useRef, useState } from "react";
import { isLength } from "validator";
import authService from "../services/AuthServices";

const required = (value) => {
  if (!value) {
    return (
      <div className="font-medium text-red-500" role="alert">
        This field is required!
      </div>
    );
  }
};

const length = (value) => {
  if (!isLength(value, { min: 5, max: 200 })) {
    return (
      <div className="font-medium text-red-500" role="alert">
        This must be between 5 and 200 characters
      </div>
    );
  }
};

function AddSauce(props) {
  const userId = authService.getCurrentUser().userId;

  const value = props.value;

  const initialSauce = {
    userId,
    name: value ? value.name : "",
    manufacturer: value ? value.manufacturer : "",
    description: value ? value.description : "",
    mainPepper: value ? value.mainPepper : "",
    imageUrl: value ? value.imageUrl : null,
    heat: value ? value.heat : 0,
  };
  const [sauce, setSauce] = useState(initialSauce);
  const [preview, setPreview] = useState(
    props.value ? props.value.imageUrl : null,
  );
  const form = useRef();
  const checkBtn = useRef();
  const imageInput = useRef();

  const handleCloseSauceForm = (e) => {
    e.preventDefault();
    props.showSauceForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      const fd = new FormData();
      Object.entries(sauce).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          fd.append(`${key}`, value);
        }
      });
      props.onDataSubmit(fd);
      props.showSauceForm(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setSauce({
        ...sauce,
        imageUrl: e.target.files[0],
      });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setSauce({
        ...sauce,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="popup__bg bg-black bg-opacity-80 absolute top-0 right-0 left-0 bottom-0 z-10">
      <Form
        onSubmit={handleFormSubmit}
        ref={form}
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 md:p-8 lg:p-10 w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 rounded-3xl flex flex-col"
      >
        <label htmlFor="name" className="font-medium mb-1">
          Sauce's name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={sauce.name}
          onChange={handleChange}
          validations={[required, length]}
          className="w-full border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="manufacturer" className="font-medium mb-1">
          Sauce's manufacturer
        </label>
        <Input
          type="text"
          name="manufacturer"
          id="manufacturer"
          value={sauce.manufacturer}
          onChange={handleChange}
          validations={[required, length]}
          className="w-full border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="description" className="font-medium mb-1">
          Description
        </label>
        <Input
          type="text"
          name="description"
          id="description"
          value={sauce.description}
          onChange={handleChange}
          validations={[required, length]}
          className="w-full border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="mainPepper" className="font-medium mb-1">
          Main ingredient
        </label>
        <Input
          type="text"
          name="mainPepper"
          id="mainPepper"
          value={sauce.mainPepper}
          onChange={handleChange}
          validations={[required, length]}
          className="w-full border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        {sauce.imageUrl ? (
          <label
            htmlFor="image"
            className="w-28 h-28 rounded-full font-medium cursor-pointer mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none transition-all"
            tabIndex="0"
          >
            <img
              src={preview}
              alt="Preview of you sauce"
              className="flex w-28 h-28 rounded-full mb-1 cursor-pointer flex-col justify-center items-center border-2 border-black hover:opacity-90 focus:outline-none transition-all"
            />
          </label>
        ) : (
          <label
            htmlFor="image"
            className="w-28 h-28 rounded-full font-medium cursor-pointer mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none transition-all"
            tabIndex="0"
          >
            <span className="flex text-center w-28 h-28 rounded-full mb-1 cursor-pointer flex-col justify-center items-center border-2 border-black hover:opacity-90 focus:outline-none transition-all">
              Add an image
            </span>
          </label>
        )}
        <Input
          type="file"
          name="imageUrl"
          id="image"
          className="hidden"
          ref={imageInput}
          onChange={handleChange}
        />
        <label htmlFor="rank" className="font-medium mb-1">
          Hot rank
        </label>
        <Input
          type="range"
          name="heat"
          id="rank"
          min="1"
          max="5"
          value={sauce.heat}
          onChange={handleChange}
          validations={[required]}
          className="w-full border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-900 focus:bg-green-900 active:bg-green-900 rounded-full p-3 w-5/12 uppercase font-bold text-white text-xl focus:outline-none transition-all"
          >
            Add
          </button>
          <button
            onClick={handleCloseSauceForm}
            className="bg-red-500 hover:bg-red-900 focus:bg-red-900 active:bg-red-900 rounded-full p-3 w-5/12 uppercase font-bold text-white text-xl focus:outline-none transition-all"
          >
            Back
          </button>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}

export default AddSauce;
