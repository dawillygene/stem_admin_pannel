import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getPageNumbers = () => {
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      return pageNumbers;
    }

    const halfWay = Math.floor(maxPagesToShow / 2);

    if (currentPage <= halfWay) {
      return [...pageNumbers.slice(0, maxPagesToShow - 1), totalPages];
    }

    if (currentPage >= totalPages - halfWay) {
      return [1, ...pageNumbers.slice(totalPages - maxPagesToShow + 1)];
    }

    return [
      1,
      ...pageNumbers.slice(
        currentPage - halfWay,
        currentPage + halfWay - 1
      ),
      totalPages
    ];
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
      <div className="text-sm text-gray-700 font-medium">
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      <nav className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-btn px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
        >
          <i className="fas fa-chevron-left mr-1"></i>
          Previous
        </button>

        {getPageNumbers().map((number, index, array) => {
          if (index > 0 && number - array[index - 1] > 1) {
            return (
              <React.Fragment key={`ellipsis-${number}`}>
                <span className="px-3 py-2 text-sm text-gray-700">...</span>
                <button
                  key={number}
                  onClick={() => onPageChange(number)}
                  className={`pagination-btn px-3 py-2 text-sm font-medium border ${
                    currentPage === number 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                  } transition-all duration-300`}
                >
                  {number}
                </button>
              </React.Fragment>
            );
          }

          return (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`pagination-btn px-3 py-2 text-sm font-medium border ${
                currentPage === number 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
              } transition-all duration-300`}
            >
              {number}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-btn px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
        >
          Next
          <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
