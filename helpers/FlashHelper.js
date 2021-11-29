import { store } from "react-notifications-component";

class FlashHelper {
  static defaultConfig = {
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 8000,
      showIcon: true,
    },
  };

  static notification = (message, title, type) => {
    store.addNotification({
      title,
      message,
      type,
      ...this.defaultConfig,
    });
  };

  static error = (message = "Something went wrong", title = "Error") => {
    this.notification(message, title, "danger");
  };

  static success = (message, title = "Success") => {
    this.notification(message, title, "success");
  };
}

export default FlashHelper;
