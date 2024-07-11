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
    const PARTS = event.target.value.split("=");
    if(PARTS[1].includes('&')){
      const REMOVED_AND_SIGN = PARTS[1].split('&');
      PARTS[1] = REMOVED_AND_SIGN[0];
    }
    setInputValue(PARTS[1]);
  };
  const options = {
    method: "GET",
    url: import.meta.env.VITE_X_RapidAPI_URL,
    params: {
      id: inputValue,
      return: "1",
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
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  function clear() {
    setInputValue("");
    setError(false);
    setData(null);
    setLoading(false);
  }

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
        {data ? (
          <button onClick={clear} className="btn searchBTN">
            Clear
          </button>
        ) : (
          <button onClick={getMusicData} className="btn searchBTN">
            Search
          </button>
        )}
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
                <img src={data.thumb} alt={data.title} />
              </div>
              <div className="details">
                <div className="title">
                  <span>Title: </span>
                  <span>{data.title}</span>
                </div>
                {data.duration && (
                  <div className="duration">
                    <span>Duration: </span>
                    <span>{data.duration} minutes</span>
                  </div>
                )}

                <div className="channel">
                  <span>Channel: </span>
                  <span>{data.author}</span>
                </div>

                <div className="download">
                  <a
                    referrerPolicy="no-referrer"
                    target="_blank"
                    download
                    className="btn_a"
                    href={data.link}
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
