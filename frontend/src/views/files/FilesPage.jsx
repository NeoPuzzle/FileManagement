import React, { useEffect, useState } from "react";
import FileList from "./FilesList";
import { getFilesAccumulated } from "../../api/files";

const FilesPage = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchAccumulated = async () => {
      try {
        const data = await getFilesAccumulated();
        console.log("Data", data.totalWeight);
        
        setTotalWeight(data.totalWeight);
        setTotalQuantity(data.totalQuantity);
      } catch (error) {
        console.error("Error al obtener datos acumulados", error);
      }
    }
    fetchAccumulated();
    console.log("fetchAccumulated", fetchAccumulated());
    
  },[]);

  return (
    <div>
      <h1>Gestión de Archivos</h1>
      <FileList onTotalChange={(weight, quantity) => {
        setTotalWeight(weight);
        setTotalQuantity(quantity);
      }} />
      
      <div>
        <h3>Resumen de Archivos</h3>
        <p><strong>Peso Total:</strong> {totalWeight.toFixed(2)} MB</p>
        <p><strong>Cantidad Total:</strong> {totalQuantity} archivos</p>
      </div>  
    </div>
  );
};

export default FilesPage;