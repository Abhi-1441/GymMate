import { persistor } from '../redux/store';

const RefreshButton = () => {
    const handleRefresh = () => {
        persistor.purge().then(() => {
            // Refresh the page to reflect the purged state
            window.location.reload();
        });
    };

    return (
        <button
            onClick={handleRefresh}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
        >
            Refresh & Purge State
        </button>
    );
};

export default RefreshButton;
