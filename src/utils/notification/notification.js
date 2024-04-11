import { Notify } from "quasar";

const successNotifyConfig = (message) => {
  Notify.create({
    message,
    color: "positive",
    icon: "check_circle",
  });
};

const errorNotifyConfig = (message) => {
  Notify.create({
    message,
    color: "negative",
    icon: "error",
  });
};

export { successNotifyConfig, errorNotifyConfig };
