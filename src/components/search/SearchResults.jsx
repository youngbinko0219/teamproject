import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/search/SearchResults.css";

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // API 엔드포인트 URL 및 쿼리 파라미터 설정
        const response = await axios.get(
          `http://localhost:8080/search?query=${encodeURIComponent(query)}`
        );
        // API 응답이 배열 형태이므로 바로 사용
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching search results", err);
        setError("검색 결과를 불러오는데 문제가 발생했습니다.");
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setError(null);
    }
  }, [query]);

  return (
    <div className="search-results">
      {error && <p className="error-message">{error}</p>}
      {results.length > 0
        ? results.map((result) => (
            <div key={result.product_id} className="search-result-item">
              <img
                src={result.images}
                alt={result.product_name}
                className="result-image"
              />
              <h3>{result.product_name}</h3>
              <p>{result.category}</p>
              <p>{result.price} 원</p>
            </div>
          ))
        : !error && <p>검색 결과가 없습니다.</p>}
    </div>
  );
};

export default SearchResults;
