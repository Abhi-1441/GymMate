import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItems } from '../redux/slices/itemSlice';

var predefinedItems = [
    { name: 'Chicken breast', calories: 165, protein: 31 },
    { name: 'Egg', calories: 78, protein: 6 },
    { name: 'Almonds', calories: 7, protein: 0.25 },
    { name: "Chapati", calories: 100, protein: 2.5 },
    { name: "Rice (1 bowl)", calories: 240, protein: 4 },
    { name: "Dal (1 bowl)", calories: 150, protein: 10 },
    { name: "Paneer (100g)", calories: 265, protein: 18 },
    { name: "Curd (1 cup)", calories: 150, protein: 8.5 },
    { name: "Samosa", calories: 262, protein: 3.5 },
    { name: "Poha", calories: 180, protein: 4 },
    { name: "Idli", calories: 58, protein: 2 },
    { name: "Dosa", calories: 133, protein: 3.5 },
    { name: "Vada", calories: 152, protein: 4.5 },
    { name: "Puri", calories: 101, protein: 1.5 },
    { name: "Biryani", calories: 290, protein: 12 },
    { name: "Upma", calories: 250, protein: 5 },
    { name: "Bhindi (1 bowl)", calories: 33, protein: 2 },
    { name: "Palak paneer (1 bowl)", calories: 180, protein: 10 },
    { name: "Rajma (1 bowl)", calories: 210, protein: 9 },
    { name: "Chole (1 bowl)", calories: 250, protein: 12 },
    { name: "Whey protein (1 scoop)", calories: 150, protein: 25 },
    { name: "2 whole eggs omlette", calories: 150, protein: 12 },
    { name: "Walnut", calories: 26.2, protein: 0.6 },
    { name: "Cashew", calories: 5.5, protein: 0.18 },
    { name: "Milk (1 cup/ 250ml)", calories: 150, protein: 8 },

];

const FoodForm = () => {
    const [foodItem, setFoodItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [suggestions, setSuggestions] = useState(predefinedItems);
    const [inputFocused, setInputFocused] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);

    useEffect(() => {
        if (!items) return;
        const additionalItems = items.map(item => ({
            name: item.foodItem,
            calories: item.calories,
            protein: item.protein,
        }));

        const mergedItems = [...predefinedItems, ...additionalItems];

        // Remove duplicates based on the 'name' property
        predefinedItems = mergedItems.filter(
            (item, index, self) =>
                index === self.findIndex((i) => i.name === item.name)
        );
        predefinedItems.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        setSuggestions(predefinedItems);
    }, [items]);

    const handleAddItem = (e) => {
        e.preventDefault();
        const capitalize = (str) => {
            if (typeof str !== 'string') return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };
        if (quantity < 0 || calories < 0 || protein < 0) {
            setError('Fields should be not negative value');
            return;
        }
        if (foodItem && quantity && calories && protein) {
            const updatedItem = {
                foodItem: capitalize(foodItem),
                quantity,
                calories,
                protein,
                totalCalories: quantity * calories,
                totalProtein: quantity * protein,
            };

            // Check if the item already exists
            const existingItemIndex = items.findIndex((item) => item.foodItem === foodItem);

            if (existingItemIndex !== -1) {
                // Update existing item
                const updatedItems = [...items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: Number(updatedItems[existingItemIndex].quantity) + Number(quantity),
                    totalCalories: Number(updatedItems[existingItemIndex].totalCalories) + Number(Number(quantity) * calories),
                    totalProtein: Number(updatedItems[existingItemIndex].totalProtein) + Number(Number(quantity) * protein),
                };
                dispatch(updateItems(updatedItems));
            } else {
                // Add new item
                dispatch(addItem(updatedItem));
            }

            // Reset the form
            setFoodItem('');
            setQuantity(1);
            setCalories(0);
            setProtein(0);
            setInputFocused(false);
            setSuggestions(predefinedItems);
            setError("");
        }
        else setError("All fields are required !");

    };

    const handleFoodItemChange = (e) => {
        const charLimit = 39;
        if (e.target.value.length > charLimit) {
            setError(`Item name should have less than ${charLimit + 1} characters`)
            return;
        }
        setError("");
        setFoodItem(e.target.value);

        if (inputFocused) {
            const matches = predefinedItems.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFoodItem(suggestion.name);
        setCalories(suggestion.calories);
        setProtein(suggestion.protein);
        setSuggestions([]);
    };

    return (
        <div >
            <h2 className="text-xl font-bold mb-4">Enter Your Food Intake</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
                <div >
                    <label className="block text-lg font-medium text-gray-700">Food Item:</label>
                    <input
                        type="text"
                        value={foodItem}
                        onChange={handleFoodItemChange}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setTimeout(() => setInputFocused(false), 1000)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter food item"
                    />
                    {inputFocused && suggestions.length > 0 && (
                        <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-1 absolute max-h-32 overflow-auto">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="p-2 cursor-pointer hover:bg-blue-100"
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter quantity"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Calories per unit:</label>
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter calories per unit"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Protein per unit (grams):</label>
                    <input
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter protein per unit"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
                >
                    Add Item
                </button>
                {error &&
                    <div className="text-red-600 font-bold">{error}</div>
                }
            </form>
        </div>
    );
};

export default FoodForm;
