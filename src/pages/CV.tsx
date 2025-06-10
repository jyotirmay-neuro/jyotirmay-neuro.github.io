import React, { useEffect } from 'react';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pages } from '../data/pageData';

const CV: React.FC = () => {
  const cvPageData = pages.find(p => p.id === 'cv');

  useEffect(() => {
    // Redirect to CV PDF file
    // Ensure this only runs if data is found, or adjust logic if CV page should always attempt to open PDF
    if (cvPageData) {
      window.open('/cv.pdf', '_blank');
    }
  }, [cvPageData]);

  if (!cvPageData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          <h1 className="text-2xl font-bold text-gray-700">Page content not found.</h1>
          <Link
            to="/"
            className="inline-flex items-center mt-6 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{cvPageData.title}</h1>
          {cvPageData.description && (
            <p className="text-xl text-gray-600 mb-8">
              {cvPageData.description}
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: cvPageData.content }}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="mr-2 w-5 h-5" />
              Download CV (PDF)
            </a>
            
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CV Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600 text-sm">Ph.D. Computational Sciences, Stanford University</p>
              <p className="text-gray-600 text-sm">M.S. Computer Science, MIT</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Research</h3>
              <p className="text-gray-600 text-sm">50+ peer-reviewed publications</p>
              <p className="text-gray-600 text-sm">H-index: 35</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Recognition</h3>
              <p className="text-gray-600 text-sm">Teaching Excellence Award</p>
              <p className="text-gray-600 text-sm">3 Best Paper Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;