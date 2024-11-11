import React, { useState } from "react";

function PlantCard({ plant, setPlants }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handleStockToggle = () => {
    const updatedStockStatus = !isSoldOut;
    setIsSoldOut(updatedStockStatus);
    
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isSoldOut: updatedStockStatus })
    })
      .then(response => response.json())
      .then(updatedPlant => {
        setPlants(prev =>
          prev.map((p) => (p.id === plant.id ? updatedPlant : p))
        );
      })
      .catch((error) => console.error("Error updating stock status:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, { method: "DELETE" })
      .then(() => setPlants((prev) => prev.filter((p) => p.id !== plant.id)))
      .catch((error) => console.error("Error deleting plant:", error));
  };

  return (
    <li className="card" data-testid={`plant-item-${plant.id}`}>
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button 
        onClick={handleStockToggle} 
        className={isSoldOut ? "sold-out" : "in-stock"}
      >
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>
      <button onClick={handleDelete}
      className="delete"
      >Delete</button>
    </li>
  );
}

export default PlantCard;
