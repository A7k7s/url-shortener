import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function Analytics() {

  const { id } = useParams();

  const [data, setData] =
    useState(null);

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await api.get(
            `/urls/${id}/analytics`
          );

        setData(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white p-6 rounded shadow">

          <h1 className="text-3xl font-bold mb-6">
            Analytics
          </h1>

          <p className="mb-3">
            <strong>
              Original URL:
            </strong>{" "}
            {data.url.original_url}
          </p>

          <p className="mb-3">
            <strong>
              Short Code:
            </strong>{" "}
            {data.url.short_code}
          </p>

          <p className="mb-3">
            <strong>
              Clicks:
            </strong>{" "}
            {data.url.clicks}
          </p>

          <p>
            <strong>
              Total Visits:
            </strong>{" "}
            {data.totalVisits}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow mt-6">

          <h2 className="text-xl font-bold mb-4">
            Visit History
          </h2>

          {data.visits.length === 0 ? (
            <p>
              No visits yet
            </p>
          ) : (
            data.visits.map(
              (visit) => (
                <div
                  key={visit.id}
                  className="border-b py-2"
                >
                  {new Date(
                    visit.visited_at
                  ).toLocaleString()}
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;