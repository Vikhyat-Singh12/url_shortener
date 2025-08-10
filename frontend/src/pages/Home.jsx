import { Zap,CheckCircle } from 'lucide-react';
import UrlShortenerForm from "../components/UrlShortenerForm";


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Trusted by 500,000+ users worldwide</span>
            </div>
            
            {/* Main Hero Content */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Shorten URLs with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Style & Analytics
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your long URLs into clean, trackable links. Get detailed analytics, 
              custom domains, and powerful management tools.
            </p>

            {/* Quick Benefits */}
            <div className="flex flex-wrap justify-center gap-6 ">
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Real-time analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Custom short codes</span>
              </div>
            </div>
          </div>

          <div className="mx-auto">
            <UrlShortenerForm />
          </div>
        </div>
      </section>
    </div>
  );
}