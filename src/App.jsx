import axios from "axios";
import { useState } from "react";
import Navbar from "./partials/Navbar";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const setValue = (event) => {
    setError(false);
    setInputValue(event.target.value);
  };

  const options = {
    method: "GET",
    url: `https://${import.meta.env.VITE_X_RapidAPI_Host}/`,
    params: {
      url: inputValue,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
      "X-RapidAPI-Host": import.meta.env.VITE_X_RapidAPI_Host,
    },
  };

  const getMusicData = async () => {
    setLoading(true);
    try {
      if (!inputValue) {
        setLoading(false);
        return setError(true);
      }
      const response = await axios.request(options);
      setData(response.data.result[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const searchMusic = () => getMusicData();

  return (
    <>
      <Navbar />
      <div id="search">
        <input
          value={inputValue}
          onChange={setValue}
          type="search"
          placeholder="Paste youtube link"
        />
        {isError && (
          <div id="error">
            <span>Paste your youtube link</span>
          </div>
        )}
        <button onClick={searchMusic} className="btn searchBTN">
          Search
        </button>
      </div>

      {isLoading && (
        <div id="loading">
          <span>Fetching information...</span>
        </div>
      )}


      {data && (
        <div className="results">
          <h4>Results:</h4>
          <div>
            <div className="card">
              <div className="thumbnail">
                <img src={data.thumbnail} alt={data.title} />
              </div>
              <div className="details">
                <div className="title">
                  <span>Title: </span>
                  <span>{data.title}</span>
                </div>
                <div className="duration">
                  <span>Duration: </span>
                  <span>{data.duration} minutes</span>
                </div>

                <div className="channel">
                  <span>Channel: </span>
                  <span>{data.channel}</span>
                </div>

                <div className="download">
                  <a
                    referrerPolicy="no-referrer"
                    target="_blank"
                    download
                    className="btn_a"
                    href={data.url}
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
