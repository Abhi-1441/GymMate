import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import TotalIntake from './components/TotalIntake';
import RefreshButton from './components/RefreshButton';
import BodyFeaturesForm from './components/BodyFeaturesForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-12">
          GymMate - Protein & Calories Tracker
        </h1>
        <BodyFeaturesForm />
        <FoodForm />
        <FoodList />
        <TotalIntake />
        <div className="mt-4 flex justify-center">
          <RefreshButton />
        </div>
      </div>
    </div>
  );
}

export default App;
