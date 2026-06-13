import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function UrlCard({ url }) {
  const navigate = useNavigate();

  const [qrCode, setQrCode] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:5000/${url.short_code}`
    );

    toast.success("Copied");
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/urls/${url.id}`);

      toast.success("Deleted");

      window.location.reload();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  const handleQr = async () => {
    try {
      const response = await api.post(
        `/urls/${url.id}/generate-qr`
      );

      setQrCode(
        response.data.qrCodeUrl
      );

      toast.success("QR Generated");
    } catch (error) {
      console.error(error);

      toast.error("QR generation failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">

      <div className="flex justify-between items-start mb-4">

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {url.short_code}
          </h3>

          <p className="text-gray-500 break-all">
            {url.original_url}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {url.clicks} Clicks
        </span>

      </div>

      <div className="flex flex-wrap gap-2">

        <button
          onClick={handleCopy}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Copy
        </button>

        <button
          onClick={() =>
            navigate(
              `/analytics/${url.id}`
            )
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          Analytics
        </button>

        <button
          onClick={handleQr}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
        >
          QR Code
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>

      </div>

      {qrCode && (
        <div className="mt-6 border-t pt-4">

          <h4 className="font-semibold mb-3">
            QR Code
          </h4>

          <img
            src={qrCode}
            alt="QR Code"
            className="w-40 border rounded-lg"
          />

          <a
            href={qrCode}
            download={`qr-${url.short_code}.png`}
            className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-lg"
          >
            Download QR
          </a>

        </div>
      )}

    </div>
  );
}

export default UrlCard;