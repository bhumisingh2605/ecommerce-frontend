const Badge = ({ text }) => {
  return (
    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
      {text}
    </span>
  );
};

export default Badge;