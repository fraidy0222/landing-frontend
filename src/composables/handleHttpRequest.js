import { Notify } from "quasar";
import {
  successNotifyConfig,
  errorNotifyConfig,
} from "src/utils/notification/notification";

export default function handleHttpRequest() {
  function handleErrors(error) {
    switch (error.response.status) {
      case 401:
        Notify.create({
          message: "No autorizado",
          color: "negative",
          position: "top-right",
        });
        localStorage.removeItem("auth");
        break;

      case 403:
        Notify.create({
          message: "No autorizado",
          color: "negative",
          position: "top-right",
        });
        break;

      case 404:
        Notify.create({
          message:
            "Elemento no se encuentra en la Base de Datos. Contacte con el Administrador del sistema.",
          color: "negative",
          position: "top-right",
        });
        break;

      case 409:
        Notify.create({
          message: "Error en el servidor",
          color: "negative",
          position: "top-right",
        });
        break;

      case 410:
        Notify.create({
          message: "Error en el servidor",
          color: "negative",
          position: "top-right",
        });
        break;

      case 419:
        Notify.create({
          message: "Error en el servidor",
          color: "negative",
          position: "top-right",
        });
        break;

      case 422:
        Notify.create({
          message: "Las credenciales no concuerdan con nuestros registros",
          color: "negative",
          position: "top-right",
        });
        break;

      case 500:
        Notify.create({
          message: "Error del servidor",
          color: "negative",
          position: "top-right",
        });
        break;

      default:
    }

    if (error.response.data) {
      for (let field in error.response.data.errors) {
        if (Array.isArray(error.response.data.errors[field])) {
          error.response.data.errors[field].forEach((errorMessage) => {
            errorNotifyConfig(errorMessage);
          });
        } else {
          errorNotifyConfig(error.response.data.errors[field]);
        }
      }
    }

    if (error.response.data.error) {
      errorNotifyConfig(error.response.data.error);
    }
  }
  return {
    handleErrors,
  };
}
