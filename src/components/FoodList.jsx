import { useSelector } from 'react-redux';

const FoodList = () => {
    const items = useSelector((state) => state.items.items);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Added Items:</h2>
            {items.length > 0 ? (
                <ul className="mt-4 space-y-2">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 bg-blue-100 rounded-lg shadow-sm"
                        >
                            <div>
                                <span className="font-semibold">{item.quantity}x</span> {item.foodItem} - {item.totalCalories} cal, {item.totalProtein}g protein
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-gray-600">No items added yet.</p>
            )}
        </div>
    );
};

export default FoodList;
