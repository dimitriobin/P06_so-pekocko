import SauceCard from "./SauceCard";

function SaucesList() {
  return (
    <div className="py-20 grid grid-cols-auto-fill xl:grid-cols-4 gap-10 content-center justify-center">
      <SauceCard rank="5" />
      <SauceCard rank="4" />
      <SauceCard rank="1" />
      <SauceCard rank="3" />
      <SauceCard rank="3" />
      <SauceCard rank="2" />
      <SauceCard rank="5" />
      <SauceCard rank="1" />
    </div>
  );
}

export default SaucesList;
