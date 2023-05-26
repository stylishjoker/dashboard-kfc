import PreviousCard from "../previous-card";

export default function UserPayment({ data }) {
  if (!data) {
    return (
      <div>
        <h2 className="font-bold uppercase oswald text-2xl">Previous Order</h2>
        <span>Haven not purchased any products before</span>
      </div>
    );
  }
  console.log(data);
  return (
    <div>
      <h2 className="font-bold uppercase oswald text-2xl">Previous Order</h2>
      {data.length !== 0 ? (
        <>
          {data.map((item, index) => (
            <PreviousCard key={index} {...item} />
          ))}
        </>
      ) : (
        <>
          <span>Haven not purchased any products before</span>
        </>
      )}
    </div>
  );
}
