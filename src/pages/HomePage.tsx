
import { BookOpen, ArrowRight, Plus,  Search } from 'lucide-react';

const HomePage = () => {
  const handleNavigateToBooks = () => {
    // Replace with your navigation method (React Router, Next.js router, etc.)
    window.location.href = '/books';
  };

  const handleNavigateToAddBook = () => {
    window.location.href = '/add-book';
  };

  const handleNavigateToBorrowSummary = () => {
    window.location.href = '/borrow-summary';
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-400 mb-6">
              Library Management
              <span className="block text-blue-600">Made Simple</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your library operations with our modern management system.
              Organize books, track inventory, and manage borrowing with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleNavigateToBooks}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 w-full sm:w-auto"
              >
                <Search className="h-5 w-5" />
                <span>View All Books</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={handleNavigateToAddBook}
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 w-full sm:w-auto"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Book</span>
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Book Management Card */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Management</h3>
                <p className="text-gray-600 mb-6">
                  Easily add, edit, and organize your entire book collection with comprehensive details.
                </p>
                <button
                  onClick={handleNavigateToBooks}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors"
                >
                  <span>Manage Books</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>



              {/* Borrow System Card */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <ArrowRight className="h-8 w-8 text-purple-600 transform rotate-45" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Borrow System</h3>
                <p className="text-gray-600 mb-6">
                  Streamlined borrowing process with due date tracking and summary reports.
                </p>
                <button
                  onClick={handleNavigateToBorrowSummary}
                  className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 transition-colors"
                >
                  <span>View Summary</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;