import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-6xl font-bold text-gray-800 mt-8">Page Not Found</h2>
        <p className="text-xl text-gray-600 mt-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-12">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-gray-600">
            Need help? Visit our{' '}
            <Link to="/challenges" className="text-blue-500 hover:text-blue-700">
              challenges page
            </Link>{' '}
            or check the{' '}
            <Link to="/leaderboard" className="text-blue-500 hover:text-blue-700">
              leaderboard
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;