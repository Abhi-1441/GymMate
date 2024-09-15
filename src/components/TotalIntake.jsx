import { useSelector } from 'react-redux';

const TotalIntake = () => {
    const totalProtein = useSelector((state) => state.items.totalProtein);
    const totalCalories = useSelector((state) => state.items.totalCalories);

    return (
        <div className="mt-8 bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Total Intake:</h2>
            <p className="text-blue-700 text-xl font-bold">{totalProtein} grams of protein</p>
            <p className="text-blue-700 text-xl font-bold">{totalCalories} calories</p>
        </div>
    );
};

export default TotalIntake;
