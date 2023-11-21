"use client";
import { getToken, getUser, getUserInformation } from "@/hook/SesionUtilClient";
import { obtener } from "@/hook/conexion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Visualizar_auto() {
  const [autos, setAutos] = useState([]);
  const valor = useSearchParams();
  const [token, setToken] = useState("");
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    const token = getToken();
    setToken(token);
    const user = getUserInformation();
    obtener(
      `index.php?funcion=listar_auto_user&external=${user.external}`,
      token
    ).then((info) => {
      console.log(info.datos);
      setAutos(info.datos);
    });
  },[]);

  return (
    <div>
      <h1> Administrar autos </h1>
      <div className="container-fluid">
        <div className="col-4">
          <Link href="/autos/crearAuto" className="btn btn-success">
            Nuevo
          </Link>
        </div>
      </div>

      <div className="container-fluid">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Placa</th>
              <th>Descuento</th>
              <th>Img</th>
              <th>Modificar</th>
              <th>Ver infomracion</th>
            </tr>
          </thead>
          <tbody>
            {autos.map((dato, i) => (
              <tr key={dato.external}>
                <td>{i + 1}</td>
                <td>{dato.nombre}</td>
                <td>{dato.descripcion}</td>
                <td>{dato.placa}</td>
                <td>
                  <p>{dato.descuento}</p>
                </td>
                <td>
                  <img
                    src={dato.foto}
                    style={{ width: "200px", height: "100px" }}
                  />
                </td>
                
                <td>
                  <Link
                    href={"/autos/editarAuto/" + dato.external}
                    className="btn btn-primary"
                  >
                    Modificar
                  </Link>
                </td>
                <td>
                  <Link
                    href={"/autos/visualizarAuto/" + dato.external}
                    className="btn btn-info"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
