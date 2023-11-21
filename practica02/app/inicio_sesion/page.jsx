"use client";
//import { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { enviar } from "@/hook/conexion";
import { inicio_sesion } from "@/hook/Autenticacion";
import mensajes from "@/componentes/Mensajes";
import { estaSesion } from "@/hook/SesionUtil";

export default function Inicio_Sesion() {
  // <>
  //router
  const router = useRouter();

  
//   const validationScheme = Yup.object().shape({
//     identificador: Yup.string()
//       .required("Ingrese un identificador electronico")
//       .email("Se requiere un identificador valido"),
//     clave: Yup.string().required("Ingrese su clave"),
//   });
  const validationScheme = Yup.object().shape({
    identificador: Yup.string()
      .required("Ingrese su número de cédula")
      .min(9, "La cédula debe tener al menos 9 caracteres")
      .max(11, "La cédula no debe tener más de 11 caracteres"),
    clave: Yup.string()
      .required("Ingrese su contraseña")
      .min(9, "La contraseña debe tener al menos 9 aracteres")
      .max(11, "La contraseña no debe tener más de 11 caracteres"),
  });

  const formOptions = {
    resolver: yupResolver(validationScheme),
  };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  //const formOption = {resolver: yupResolver(validationScheme)};
  //const [register, handleSubmit, reset, formState] = useForm(formOption);
  const { errors } = formState;

  const sendData = (data) => {
    // console.log(data);
    var data = { 'funcion': "inicio", 'identificador':data.identificador, 'clave': data.clave };
    enviar('index.php?', data).then((info) => {
      console.log('dentro de enviar')
      console.log(info);
    });

    inicio_sesion(data).then((info) => {
      console.log(info);
      if(!estaSesion()){
        mensajes("Error en inicio de sesion", info[0].msg, "error");
        console.log(texto);
      }else{
        mensajes("Has ingresado en el sistemas", "Bienvenido usuario");
        router.push("/principal");
      }
    });
  };

  return (
    <div className="container">
      <p className="h1">Inicio de sesion</p>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="tab-login"
            data-mdb-toggle="pill"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form onSubmit={handleSubmit(sendData)}>
            <div className="text-center mb-3">
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

            <p className="text-center">or:</p>

            <div className="form-outline mb-4">
              <input
                {...register("identificador")}
                name="identificador"
                id="identificador"
                className={`form-control ${errors.identificador ? "is-invalid" : ""}`}
              />
              <label className="form-label"> Identificador </label>
              <div className="alert alert-danger invalid-feedback">
                {errors.identificador?.message}
              </div>
            </div>

            <div className="form-outline mb-4">
              <input
                {...register("clave")}
                name="clave"
                id="clave"
                type="password"
                className={`form-control ${errors.clave ? "is-invalid" : ""}`}
              />
              <label className="form-label">Password</label>
              <div className="alert alert-danger invalid-feedback">
                {errors.clave?.message}
              </div>
            </div>



            <div className="row mb-4">
              

              <div className="col-md-6 d-flex justify-content-center">
                <a href="#!">Olvidaste la contraseña?</a>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                No eres un miembro? <a href="#!">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
