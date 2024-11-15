import React, { useState } from "react";
import { createFile } from "../../api/files";

const FileUpload = () => {
  const [fileDetails, setFileDetails] = useState({
    name: "",
    type: "",
    size: 0,
    quantity: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const name = file.name;
      const type = name.split(".").pop(); 
      const size = file.size / (1024 * 1024); 

      setFileDetails({
        name,
        type,
        size: size.toFixed(2),
        quantity: 1,
      });
    }
  };

  const handleUpload = async () => {
    if (!fileDetails.type || fileDetails.size === 0) {
      alert("Selecciona un achivo valido")
      return
    }

    try {
      const fileData = {
        type: fileDetails.type,
        size: fileDetails.size,
        quantity: fileDetails.quantity,
      };

      console.log("Estado del archivo: ",fileData);
      

      const response = await createFile(fileData);

      if (response) {
        alert("archivo subido exitosamente!!!");
        setFileDetails({
          name: "",
          type: "",
          size: 0,
          quantity: 1,
        });
      }
    } catch (error) {
      console.error("Error al subir :", error);
      alert("No subio archivo");
    }
  }

  return (
    <div className="container mt-5">
      <h2>Subir un archivo</h2>
        <div className="input-group mb-3">
          <input
          type="file"
          className="form-control"
          id="inputGroupFile02"
          onChange={handleFileChange}
        />
        <label className="input-group-text" htmlFor="inputGroupFile02"></label>
      </div>

      {fileDetails.name && (
        <div className="mb-3">
          <h5>Detalles del archivo:</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Nombre:</strong> {fileDetails.name}
            </li>
            <li className="list-group-item">
              <strong>Tipo:</strong> {fileDetails.type}
            </li>
            <li className="list-group-item">
              <strong>Tamaño:</strong> {fileDetails.size} MB
            </li>
            <li className="list-group-item">
              <strong>Cantidad:</strong> {fileDetails.quantity} archivo(s)
            </li>
          </ul>
        </div>
      )}

<button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={!fileDetails.name}
      >
        Subir archivo
      </button>

    </div>
  );
};

export default FileUpload;

