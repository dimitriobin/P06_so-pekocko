import SauceCard from "./SauceCard";

function SaucesList() {
  return (
    <>
      <button className="underline mb-8 mx-auto block text-xl">
        Add a new sauce
      </button>
      <div className="grid grid-cols-auto-fill xl:grid-cols-4 gap-10 content-center justify-center">
        <SauceCard sauce={{ id: 1, rank: 5 }} />
        <SauceCard sauce={{ id: 2, rank: 4 }} />
        <SauceCard sauce={{ id: 3, rank: 3 }} />
        <SauceCard sauce={{ id: 4, rank: 2 }} />
        <SauceCard sauce={{ id: 5, rank: 1 }} />
        <SauceCard sauce={{ id: 6, rank: 4 }} />
        <SauceCard sauce={{ id: 7, rank: 5 }} />
        <SauceCard sauce={{ id: 8, rank: 3 }} />
        <SauceCard sauce={{ id: 9, rank: 2 }} />
        <SauceCard sauce={{ id: 10, rank: 1 }} />
      </div>
    </>
  );
}

export default SaucesList;
