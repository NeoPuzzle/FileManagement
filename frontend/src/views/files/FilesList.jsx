import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFile, getFiles } from "../../api/files";

const FileList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesData = await getFiles();
        setFiles(filesData);
        console.log(filesData);
        
      } catch (error) {
        console.error("Error obteniendo los archivos", error);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      setFiles(files.filter((file) => file.id !== id));
    } catch (error) {
      console.error("Error eliminando el archivo", error);
    }
  };

  return (
    <div>
      <h2>Archivos</h2>
      <button className="btn btn-primary" onClick={() => navigate("/files/create")}>Crear archivo</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Peso (MB)</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className={`table-${file.type.toLowerCase()}`}>
              <td>{file.type}</td>
              <td>{file.weight} MB</td>
              <td>{file.quantity} u.</td>
              <td>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleDelete(file.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
