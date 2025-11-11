const API_KEY = "TCE3KF3XDMP3MUU6VX3LT2AGY";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
// const testData = "./src/utils/data/london.json";

export const fetchQueryWeather = async (query) => {
  if (!query) {
    throw new Error(`Invalid query: ${query}`);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/${query}/next7days?key=${API_KEY}`,
    );
    // const response = await fetch(testData);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to retrieve weather data for query: ${query}`, error);
  }
};
