import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import UrlCard from "../components/UrlCard";
import toast from "react-hot-toast";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const userName =
  localStorage.getItem(
    "userName"
  );
  const fetchUrls = async () => {
    try {
      const response = await api.get("/urls");
      setUrls(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCreateUrl = async (e) => {
    e.preventDefault();

    try {
      await api.post("/urls", {
        originalUrl,
        customAlias,
      });

      toast.success("URL Created");

      setOriginalUrl("");
      setCustomAlias("");

      fetchUrls();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">

  <h1 className="text-3xl font-bold text-slate-800">
    Welcome back, {userName}
  </h1>
</div>
          <h2 className="text-3xl font-bold mb-2">
            Create Short URL
          </h2>

          <p className="text-gray-500 mb-6">
            Create and manage your shortened links.
          </p>

          <form
            onSubmit={handleCreateUrl}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter original URL"
              value={originalUrl}
              onChange={(e) =>
                setOriginalUrl(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              placeholder="Custom Alias (Optional)"
              value={customAlias}
              onChange={(e) =>
                setCustomAlias(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
            >
              Create URL
            </button>
          </form>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            My URLs
          </h2>

          <span className="bg-black text-white px-4 py-2 rounded-full">
            {urls.length} Links
          </span>
        </div>

        <div className="grid gap-4">
          {urls.length > 0 ? (
            urls.map((url) => (
              <UrlCard
                key={url.id}
                url={url}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              No URLs created yet.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;