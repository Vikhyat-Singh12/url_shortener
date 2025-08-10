import { useState } from "react";
import { Link2, Copy, CheckCircle, ExternalLink, Scissors } from "lucide-react";
import useUrlStore from "../store/url.js";
import toast from "react-hot-toast";

export default function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getshortenUrl, shortenUrl } = useUrlStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(originalUrl);
    
    try {
      await getshortenUrl(originalUrl);
      toast.success("URL shortened successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenUrl);
      setCopied(true);
      toast.success("Short URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600 text-lg">Transform your long URLs into clean, shareable links</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
          <div onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url-input" className="block text-sm font-semibold text-gray-700 mb-3">
                Enter your long URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/your-very-long-url-here"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && originalUrl.trim()) {
                      handleSubmit(e);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-lg"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !originalUrl.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>Shorten URL</span>
                </>
              )}
            </button>
          </div>

          {/* Result Section */}
          {shortenUrl && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Your shortened URL is ready!</h3>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-green-200 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1">Short URL:</p>
                    <div className="flex items-center space-x-3">
                      <a
                        href={shortenUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg truncate flex items-center space-x-1 hover:underline"
                      >
                        <span className="truncate">{shortenUrl}</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 transition-all duration-200 flex items-center justify-center space-x-2 hover:border-gray-300"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setOriginalUrl("");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Scissors className="w-5 h-5" />
                  <span>Shorten Another</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Fast, secure, and reliable URL shortening service</p>
        </div>
      </div>
    </div>
  );
};