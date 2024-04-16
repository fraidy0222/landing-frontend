import { Notify } from "quasar";
import { errorNotifyConfig } from "src/utils/notification/notification";

// Función para eliminar la autenticación del usuario
const clearAuthData = () => {
  localStorage.removeItem("auth");
};

// Función para manejar notificaciones de error
const handleErrorNotification = (message) => {
  Notify.create({
    message,
    color: "negative",
    position: "top-right",
  });
};

export default function handleHttpRequest() {
  function handleErrors(error) {
    const { status, data, config } = error.response;
    const isLoginError = config.url.includes("login") && status === 422;

    const errorMessages = {
      401: "No autorizado",
      403: "No autorizado",
      404: "El elemento no se encuentra en la Base de Datos. Contacte con el Administrador del sistema.",
      409: "Error en el servidor",
      410: "Error en el servidor",
      419: "Error en el servidor",
      422: isLoginError
        ? "Las credenciales no concuerdan con nuestros registros"
        : null,
      500: "Error del servidor",
    };

    // Manejo de errores específicos
    if (errorMessages[status]) {
      handleErrorNotification(errorMessages[status]);
      if (status === 401) clearAuthData();
    } else if (status !== 422) {
      errorNotifyConfig("Error desconocido", status);
    }

    // Manejo de errores de validación de formulario
    if (status === 422 && !isLoginError && data && data.errors) {
      for (let field in data.errors) {
        const fieldErrors = data.errors[field];
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach(errorNotifyConfig);
        } else {
          errorNotifyConfig(fieldErrors);
        }
      }
    }
  }

  return {
    handleErrors,
  };
}
