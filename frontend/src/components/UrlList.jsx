import { useEffect, useState } from "react";
import { ExternalLink, Copy, Eye, Calendar, Link2, BarChart3, CheckCircle } from "lucide-react";
import useUrlStore from "../store/url.js";
import toast from "react-hot-toast";

export default function UrlList() {
  const { urls } = useUrlStore();
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (shortCode, id) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const truncateUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!urls || urls.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No URLs Yet</h2>
            <p className="text-gray-600 text-lg">
              Start shortening URLs to see them appear in your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Manage and track all your shortened URLs
          </p>
          <div className="mt-4 inline-flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{urls.length} Total URLs</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{urls.reduce((sum, url) => sum + url.clicks, 0)} Total Clicks</span>
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <Link2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Original URL
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Short URL
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Clicks
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Created
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {urls.map((url, index) => (
                  <tr
                    key={url._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {truncateUrl(url.original_url, 60)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new URL(url.original_url).hostname}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <a
                          href={`/${url.short_code}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline flex items-center space-x-1"
                        >
                          <span>/{url.short_code}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Eye className="w-3 h-3 mr-1" />
                        {url.clicks}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {formatDate(url.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => copyToClipboard(url.short_code, url._id)}
                        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 space-x-1"
                      >
                        {copiedId === url._id ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}