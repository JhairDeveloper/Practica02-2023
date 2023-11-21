"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { enviar, obtener } from "@/hook/conexion";
import { useEffect, useState } from "react";
import { getToken, getUserInformation } from "@/hook/SesionUtilClient";
import mensajes from "@/componentes/Mensajes";

export default function Crear_auto({ marcass }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [external, setExternal] = useState('');
  useEffect(() => {
    const token = getToken();
    setToken(token);
    const user = getUserInformation();
    setExternal(user.external);
    obtener("index.php?funcion=marcas").then((info) => {
      setMarcas(info.datos);
    });
    
  }, []);

  useEffect(() => {
    console.log(marcas);
  }, [marcas, external]);

  const validationScheme = Yup.object().shape({
    descripcion: Yup.string().required("La descripcion es valida"),
    subtotal: Yup.string().required("EL subtotal es requerido"),
    iva: Yup.string().required("El iva es requerido"),
    total: Yup.string().required("EL total es requerido"),
    descuento: Yup.string().required("EL descuento es requerido"),
    placa: Yup.string().required("La placa es requerida"),
    chasis: Yup.string().required("EL chasis es requerido"),
    foto: Yup.string().required("La foto es requerida"),
    marca: Yup.string().required("La marca es requerida"), // external
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);

  const { errors } = formState;
  const sendData = (data) => {

    var data = {
      descripcion: data.descripcion,
      subtotal: data.subtotal,
      iva: data.iva,
      total: data.total,
      descuento: data.descuento,
      placa: data.placa,
      chasis: data.chasis,
      foto: data.foto,
      user: external,
      marca: data.marca,
      funcion: "guardarAuto",
    };
    
    console.log('data ',data);
    console.log('token', token);
    enviar("index.php", data, token)
      .then((info) => {
        console.log("se ha enviado");
        console.log(info);
        mensajes("Auto creado", "Gracias");
        router.push("/autos");
      })
  };

  return (
    <div className="container">
      <p className="h1">Nuevo auto</p>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form onSubmit={handleSubmit(sendData)}>
            <div className="text-center mb-1">
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("descripcion")}
                name="descripcion"
                id="descripcion"
                className={`form-control ${
                  errors.descripcion ? "is-invalid" : ""
                }`}
              />
              <label className="form-label">Descripcion</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.descripcion?.message}
              </div>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("subtotal")}
                name="subtotal"
                id="subtotal"
                className={`form-control ${
                  errors.subtotal ? "is-invalid" : ""
                }`}
              />
              <label className="form-label">Subtotal</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.subtotal?.message}
              </div>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("iva")}
                name="iva"
                id="iva"
                className={`form-control ${errors.iva ? "is-invalid" : ""}`}
              />
              <label className="form-label">Iva</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.iva?.message}
              </div>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("total")}
                name="total"
                id="total"
                className={`form-control ${errors.total ? "is-invalid" : ""}`}
              />
              <label className="form-label">Total</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.total?.message}
              </div>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("descuento")}
                name="descuento"
                id="descuento"
                className={`form-control ${
                  errors.descuento ? "is-invalid" : ""
                }`}
              />
              <label className="form-label">Descuento</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.descuento?.message}
              </div>
            </div>

            <div className="form-outline mb-1">
              <input
                {...register("placa")}
                name="placa"
                id="placa"
                className={`form-control ${errors.placa ? "is-invalid" : ""}`}
              />
              <label className="form-label">Placa</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.placa?.message}
              </div>
            </div>
            <div className="form-outline mb-1">
              <input
                {...register("chasis")}
                name="chasis"
                id="chasis"
                className={`form-control ${errors.chasis ? "is-invalid" : ""}`}
              />
              <label className="form-label">Chasis</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.chasis?.message}
              </div>
            </div>
            <div className="form-outline mb-1">
              <input
                {...register("foto")}
                name="foto"
                id="foto"
                className={`form-control ${errors.foto ? "is-invalid" : ""}`}
              />
              <label className="form-label">Foto</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.foto?.message}
              </div>
            </div>
            <div className="form-outline mb-1">
              <select
                {...register("marca")}
                class="form-select form-select-sm"
                className={`form-control ${errors.marca ? "is-invalid" : ""}`}
                aria-label=".form-select-lg example"
                id="marca"
              >
                {marcas.map((opcion, index) => (
                  <option key={index} value={opcion.external_id}>
                    {opcion.nombre}
                  </option>
                ))}
              </select>
              <label className="form-label">Marca</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.marca?.message}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
