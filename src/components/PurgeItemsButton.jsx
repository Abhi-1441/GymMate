import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearItems } from '../redux/slices/itemSlice';

const PurgeItemsButton = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);

    const handlePurge = () => {
        dispatch(clearItems());
    }
    return (
        items && items.length > 0 &&
        <button
            onClick={handlePurge}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg"
        >
            Clear All Items
        </button >
    )
}

export default PurgeItemsButton;