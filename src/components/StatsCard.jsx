const StatsCard = ({ label, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 w-52 text-center">
      <p className="text-red-700 font-semibold">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;
