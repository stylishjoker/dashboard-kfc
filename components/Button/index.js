export default function Button({ handleClick, children, bg, text }) {
  return (
    <button
      className={`${bg} p-2 rounded-lg min-w-[100px] hover:shadow-[5px_5px_gray] hover:delay-100`}
      onClick={handleClick}
    >
      <span
        className={`center-row pointer-events-none capitalize font-semibold ${text}`}
      >
        {children}
      </span>
    </button>
  );
}
