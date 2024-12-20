import { useState } from "react";
import axios from "axios";

const Generate = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Array kategori dan pemetaan ke kategori API
  const categories = [
    "Age",
    "Alone",
    "Amazing",
    "Anger",
    "Architecture",
    "Art",
    "Attitude",
    "Beauty",
    "Best",
    "Birthday",
    "Business",
    "Car",
    "Change",
    "Communication",
    "Computers",
    "Cool",
    "Courage",
    "Dad",
    "Dating",
    "Death",
    "Design",
    "Dreams",
    "Education",
    "Environmental",
    "Equality",
    "Experience",
    "Failure",
    "Faith",
    "Family",
    "Famous",
    "Fear",
    "Fitness",
    "Food",
    "Forgiveness",
    "Freedom",
    "Friendship",
    "Funny",
    "Future",
    "God",
    "Good",
    "Government",
    "Graduation",
    "Great",
    "Happiness",
    "Health",
    "History",
    "Home",
    "Hope",
    "Humor",
    "Imagination",
    "Inspirational",
    "Intelligence",
    "Jealousy",
    "Knowledge",
    "Leadership",
    "Learning",
    "Legal",
    "Life",
    "Love",
    "Marriage",
    "Medical",
    "Men",
    "Mom",
    "Money",
    "Morning",
    "Movies",
    "Success",
  ];

  const getRandomQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "V5haDc6UqAfnYoMuUXrqig==Nq9duadfO0vqmjfk", // API key Anda
        },
        params: {
          category: selectedCategory
            ? selectedCategory.toLowerCase()
            : undefined, // Gunakan kategori dalam lowercase
        },
      });

      // Menangani response yang kosong
      if (response.data.length === 0) {
        setError("No quotes found for this category.");
        return;
      }

      const randomQuote =
        response.data[Math.floor(Math.random() * response.data.length)];
      setQuote(randomQuote);
    } catch (err) {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Memilih atau menghapus kategori
  };

  // Filter kategori berdasarkan query pencarian
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="quote-container p-4 justify-content-center align-items-center d-flex flex-column">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quote ? (
        <div>
          <p className="quote-text fs-5 fw-bold">"{quote.quote}"</p>
          <p className="quote-author fw-bold">- {quote.author}</p>
        </div>
      ) : (
        <p className="quote-text">Click the button to get a quote!</p>
      )}

      {/* Row untuk input pencarian dan kategori */}
      <div className="row w-100 mb-4 align-items-center">
        <div className="col col-lg-2">
          {/* Input untuk pencarian kategori */}
          <input
            type="text"
            className="form-controls bg-transparent text-white"
            placeholder="Search categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col col-lg-10 d-flex overflow-auto custom-scrollbar">
          {/* Tampilan tombol kategori yang difilter berdasarkan pencarian */}
          {filteredCategories.map((category) => (
            <button
              key={category}
              className={`btn me-3 ${
                selectedCategory === category
                  ? "btn-category"
                  : "btn-outline-category"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tombol untuk generate quote */}
      <div className="row w-100">
        <div className="col d-flex justify-content-end align-items-end">
          <button className="btn btn-submit" onClick={getRandomQuote}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
