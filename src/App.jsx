import { useEffect, useState } from "react";
import "./App.css";
import SelectInput from "./components/SelectInput";
function App() {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [country, setCountry] = useState([]);
  useEffect(() => {
    async function fetchCountry() {
      const response = await fetch("https://laravel-world.com/api/countries");
      const country = await response.json();
      setCountry(country.data);
    }
    fetchCountry();
  }, []);
  const getYearRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  return (
    <div className="container">
      <SelectInput
        option={country || []}
        placeholder="Select Country"
        selectedItem={selectedCountry}
        onChange={(data) => setSelectedCountry(data)}
      />
      
      <SelectInput
        option={getYearRange(2024, 2024 - 10, -1)}
        placeholder="Select Year"
        selectedItem={selectedYear}
        onChange={(data) => setSelectedYear(data)}
      />
    </div>
  );
}

export default App;
