// Spinner component used when the application is in loading state
function Spinner() {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black dark:border-white"></div>
        </div>
    );
}

export default Spinner;