import { useEffect, useState } from "react";
import "./App.css";
import { fetchQueryWeather } from "./utils/api.jsx";
import { capitalizeWords } from "./utils/functions.jsx";
import DayCard from "./components/day-card/DayCard.jsx";

function App() {
  const [data, setData] = useState();
  const [input, setInput] = useState("arlington");
  const [query, setQuery] = useState("arlington");

  useEffect(() => {
    fetchQueryWeather(query).then((data) => setData(data));
  }, [query]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange}></input>
        </form>
        {!data ? (
          <p>Loading...</p>
        ) : (
          <div className="weather-container">
            {/* Header */}
            <div className="header">
              <h1>
                {`${capitalizeWords(data.resolvedAddress)} `}
                <span className="coords">{`(${data.latitude}, ${data.longitude})`}</span>
              </h1>
            </div>

            {/* Weather Data - 7 Days */}
            <div className="cards-flex">
              {data.days.map((day, index) => {
                return <DayCard key={`day-${index}`} data={day} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
