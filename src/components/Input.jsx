export default function Input({ type = "text", placeholder }) {
  return (
    <div className="relative w-full">
      
      {/* الحقل نفسه */}
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white/10 text-white placeholder-gray-300
          border border-white/20
          outline-none
          transition
          focus:ring-2 focus:ring-blue-500
          focus:bg-white/20
        "
      />

    </div>
  );
}