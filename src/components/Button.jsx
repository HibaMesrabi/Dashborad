export default function Button({ children }) {
  return (
    <button
      className="
        w-full py-3 rounded-lg font-semibold
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-700 hover:to-blue-600
        text-white
        shadow-lg
        transition duration-300
      "
    >
      {children}
    </button>
  );
}