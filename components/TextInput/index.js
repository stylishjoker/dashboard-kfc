export default function TextInput({
  placeholder,
  label,
  type = "text",
  onTextChange,
  value,
}) {
  const onUdateInputValue = (event) => {
    onTextChange(event.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-left mt-[20px]">
      <label className="capitalize font-semibold">{label}</label>
      <input
        value={value}
        onChange={onUdateInputValue}
        className="block w-[100%] px-4 py-2 border border-[#ccc] mt-[5px]"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
