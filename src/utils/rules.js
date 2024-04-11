// let regexUrl = new RegExp("^https?://[w-]+(.[w-]+)+[/#?]?.*$");
const rules = {
  required: (val) => (val && val.length > 0) || "Este campo es requerido",
  requiredSelect: (val) =>
    (val !== null && val !== "") || "Este campo es requerido",
  email: (val) =>
    (val && /.+@.+\..+/.test(val)) || "El correo debe de ser válido",
  emailNotRequired: (val) =>
    !val || /.+@.+\..+/.test(val) || "El correo debe de ser válido",
  password: (val) =>
    (val && /^(?=.*[A-Z])(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}$/.test(val)) ||
    "La contraseña debe contener al menos una letra mayúscula y un caracter especial",
  passwordNotRequired: (val) =>
    !val ||
    /^(?=.*[A-Z])(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,}$/.test(val) ||
    "La contraseña debe contener al menos una letra mayúscula y un carácter especial",

  passwordMin6: (val) =>
    !val || val.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
  numberGreaterZero: (val) =>
    (val > 0 && val < 10000) || "Este campo tiene que ser mayor o igual a 0",

  validUrlNotRequired: (val) =>
    !val ||
    /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(val) ||
    "No es una dirección URL válida",
};

export default rules;
