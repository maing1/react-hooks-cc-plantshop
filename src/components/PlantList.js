import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants }) {

  return (
    <div className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} setPlants={setPlants} />
      ))}
    </div>
  );
}

export default PlantList;

