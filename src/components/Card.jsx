const Card = ({ icon: Icon, iconColor = "text-gray-500", title, value }) => (
    <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center">
            <Icon className={`text-lg ${iconColor}`} /> {/* Gunakan warna disini */}
            <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
);
export default Card