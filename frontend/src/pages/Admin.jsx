import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, Link2, RefreshCw, Download, Filter, Calendar } from "lucide-react";
import UrlList from "../components/UrlList";
import useUrlStore from "../store/url";

const MockUrlList = () => (
  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
    <div className="text-center text-gray-500">
      <UrlList/>
    </div>
  </div>
);

export default function Admin() {
  const { getUrls, urls } = useUrlStore();
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      await getUrls();
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to load URLs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    loadData();
  };

  // Calculate stats (you can adjust these based on your actual data structure)
  const totalUrls = urls?.length || 0;
  const totalClicks = urls?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0;
  const avgClicks = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;
  const activeUrls = urls?.filter(url => (url.clicks || 0) > 0).length || 0;

  const stats = [
    {
      icon: Link2,
      title: "Total URLs",
      value: totalUrls.toLocaleString(),
      changeType: "positive",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Total Clicks",
      value: totalClicks.toLocaleString(),
      changeType: "positive",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Avg Clicks/URL",
      value: avgClicks.toString(),
      changeType: "positive",
      color: "purple"
    },
    {
      icon: Users,
      title: "Active URLs",
      value: activeUrls.toString(),
      changeType: "positive",
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-600",
      green: "from-green-500 to-green-600 bg-green-50 text-green-600",
      purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-600",
      orange: "from-orange-500 to-orange-600 bg-orange-50 text-orange-600"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Monitor and analyze your URL performance
              </p>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color);
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>


        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 mb-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mr-3"></div>
              <span className="text-gray-600 font-medium">Loading dashboard data...</span>
            </div>
          </div>
        )}

        {/* URL List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              URL Management
            </h2>
            <div className="text-sm text-gray-500">
              {totalUrls} total URLs
            </div>
          </div>
          
          <MockUrlList />
        </div>
      </div>
    </div>
  );
}