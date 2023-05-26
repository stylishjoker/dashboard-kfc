export default function DropdownInput({ label, onTextChange, data }) {
  const onUdateInputValue = (event) => {
    onTextChange(event.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-left mt-[20px]">
      <label className="capitalize font-semibold">{label}</label>
      <select
        className="p-2 border "
        onChange={(text) => onUdateInputValue(text)}
      >
        {data.map((item) => (
          <option
            key={item.id}
            value={item.id}
            onClick={() => console.log("hehe")}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
