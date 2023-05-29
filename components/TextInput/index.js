export default function TextInput({
  placeholder,
  label,
  type = "text",
  onTextChange,
  value,
  error,
}) {
  const onUdateInputValue = (event) => {
    onTextChange(event.target.value);
  };
  return (
    <div className="flex relative flex-col justify-center items-left mt-[20px] pb-4">
      <label className="capitalize font-semibold">{label}</label>
      <input
        value={value}
        onChange={onUdateInputValue}
        className="block w-[100%] px-4 py-2 border border-[#ccc] mt-[5px]"
        type={type}
        placeholder={placeholder}
      />
      <span className="absolute bottom-[-20px] text-xs text-red-400">
        {error}
      </span>
    </div>
  );
}
