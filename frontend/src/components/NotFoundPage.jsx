import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-9xl font-extrabold text-red-500">404</h1>
            <h2 className="text-4xl font-bold mt-4">Oops! Page Not Found</h2>
            <p className="text-xl mt-4 mb-8 max-w-md text-center">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;