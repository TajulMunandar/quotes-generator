import { useState } from "react";
import axios from "axios";
// API URL dan key
const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "YOUR_API_KEY"; // Ganti dengan API Key Anda

const Generate = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fungsi untuk mendapatkan kutipan acak dari API
  const getRandomQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      const randomQuote =
        response.data[Math.floor(Math.random() * response.data.length)];
      setQuote(randomQuote);
    } catch (err) {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="quote-container p-4 justify-content-center align-items-center d-flex flex-column">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quote ? (
        <div>
          <p className="quote-text">"{quote.quote}"</p>
          <p className="quote-author">- {quote.author}</p>
        </div>
      ) : (
        <p className="quote-text">Click the button to get a quote!</p>
      )}
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-outline-info">category</button>
        </div>
      </div>
      <button className="btn btn-submit" onClick={getRandomQuote}>
        Generate
      </button>
    </div>
  );
};

export default Generate;
