function AddSauce({ showSauceForm }) {
  const image_url = false;

  const handleCloseSauceForm = (e) => {
    e.preventDefault();

    showSauceForm(false);
  };

  return (
    <div className="popup__bg bg-black bg-opacity-80 absolute top-0 right-0 left-0 bottom-0 z-10">
      <form className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 md:p-8 lg:p-10 w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 rounded-3xl flex flex-col">
        <label htmlFor="name" className="font-medium mb-1">
          Sauce's name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="creator" className="font-medium mb-1">
          Sauce's creator
        </label>
        <input
          type="text"
          name="creator"
          id="creator"
          className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="description" className="font-medium mb-1">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        <label htmlFor="ingredient" className="font-medium mb-1">
          Main ingredient
        </label>
        <input
          type="text"
          name="ingredient"
          id="ingredient"
          className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
        />
        {image_url ? (
          <label
            htmlFor="image"
            className="w-28 h-28 rounded-full font-medium cursor-pointer mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none transition-all"
            tabIndex="0"
          >
            <img
              src="https://picsum.photos/800"
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
            <span
              src="https://picsum.photos/800"
              alt="Preview of you sauce"
              className="flex text-center w-28 h-28 rounded-full mb-1 cursor-pointer flex-col justify-center items-center border-2 border-black hover:opacity-90 focus:outline-none transition-all"
            >
              Add an image
            </span>
          </label>
        )}
        <input type="file" name="image" id="image" className="hidden" />
        <label htmlFor="rank" className="font-medium mb-1">
          Hot rank
        </label>
        <input
          type="range"
          name="rank"
          id="rank"
          min="1"
          max="5"
          className="border-2 border-black rounded px-3 py-2 text-xl mb-4 focus:ring focus:ring-yellow-600 focus:ring-offset-4 focus:ring-offset-white  transition-all"
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
      </form>
    </div>
  );
}

export default AddSauce;
