"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { enviar, obtener } from "@/hook/conexion";
import { useEffect, useState } from "react";
import { getToken, getUserInformation } from "@/hook/SesionUtilClient";
import Link from "next/link";

export default function Editar_auto({params}){
  const {external} = params;
  const router = useRouter();
  const [token, setToken] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [externalUser, setExternalUser] = useState('');
  const [auto, setAuto] = useState([]);
  const [valuesForm, setValuesForm] = useState({});
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const token = getToken();
    setToken(token);
    const user = getUserInformation();
    setExternalUser(user.external);
    obtener("index.php?funcion=marcas").then((info) => {
      setMarcas(info.datos);
    });
    obtener(`index.php?funcion=obtener_auto&external=${external}`, token).then(
      (info) => {
        setValuesForm(info.datos[0]);
        setFoto(info.datos[0].foto);
      }
    );

  }, []);


  useEffect(() => {
    reset(valuesForm);
  }, [marcas, valuesForm]);


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
    resolver: yupResolver(validationScheme)
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
 


  const { errors } = formState;



  return (
    <div className="container">
      <p className="h1">Ver informacion del auto</p>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form>
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
              />
              <label className="form-label">Chasis</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.chasis?.message}
              </div>
            </div>
            <div className="form-outline mb-1">
                  <img
                    src={foto}
                    style={{ width: "300px", height: "150px" }}
                  />
              <p className="form-label">Foto</p>
              <div className="alert alert-danger invalid-feedback">
                {errors.foto?.message}
              </div>
            </div>
            <div className="form-outline mb-1">
              <input
                {...register("estado")}
                name="estado"
                id="estado"
                className={`form-control ${errors.estado ? "is-invalid" : ""}`}
                readOnly
              />
              <label className="form-label">Estado</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.estado?.message}
              </div>
            </div>
            <Link href="/autos" className="btn btn-info">
                Regresar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}