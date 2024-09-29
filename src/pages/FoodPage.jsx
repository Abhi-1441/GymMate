import React from 'react';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import TotalIntake from '../components/TotalIntake';
import AddToCalendarButton from '../components/AddToCalendarButton';
import PurgeItemsButton from '../components/PurgeItemsButton';

const FoodPage = () => (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center min-h-screen">
        <div className='w-full max-w-4xl bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg p-6 md:p-8'>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Food Intake</h1>
            <FoodForm />
            <FoodList />
            <TotalIntake />
            <PurgeItemsButton />
            <AddToCalendarButton />
        </div>
    </div>
);

export default FoodPage;
