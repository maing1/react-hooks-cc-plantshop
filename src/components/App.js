import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch plants data on initial load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlants(data);
      })
  }, []);

  // Filter list of plants
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <main>
      <Header />
      <NewPlantForm setPlants={setPlants} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} setPlants={setPlants} />
    </main>
  );
}

export default App;
