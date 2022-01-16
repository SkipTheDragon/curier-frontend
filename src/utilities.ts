import { notification } from "ant-design-vue";
import "ant-design-vue/es/notification/style/css";
import { router } from "./main";
import { SmileOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import { store } from "./store";
import { instance } from "./api";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts !== undefined && parts.length === 2)
    /* @ts-ignore */
    return parts.pop().split(";").shift();
  else return [];
}

export const login = (payload: Object) => {
  instance
    .post("auth/signin", payload, {
      withCredentials: true,
    })
    .then(({ data }) => {
      store.commit("login", data);
      openNotification(
        "Successfully Authenticated!",
        "You will be redirected in 3 seconds. And can now access the pages as an [" +
          store.state.roles?.toString() +
          "]",
        "#108ee9",
        true,
        "/"
      );
    })
    .catch(() =>
      openNotification(
        "Failed To Authenticate!",
        "You can try verifying your credentials",
        "red"
      )
    );
};
export const statusToText = (status: number): string => {
  if (status === 1) {
    return "Order Confirmed";
  } else if (status === 2) {
    return "Order Taken";
  } else if (status === 3) {
    return "In Deposit";
  } else if (status === 4) {
    return "Left to Destination";
  } else if (status === 5) {
    return "In Destination Deposit";
  } else if (status === 6) {
    return "Fulfilled";
  }
  return "Order Cancelled";
};
export const openNotification = (
  message: string,
  description: string,
  color: string,
  pushState: boolean = false,
  pushLocation: string = "",
  timeout = 3000
) => {
  notification.success({
    message,
    description,
    icon: h(SmileOutlined, { style: "color:" + color }),
  });
  if (pushState) {
    setTimeout(() => {
      if (store.state.isAuth === true) {
        router.push(pushLocation);
      }
    }, timeout);
  }
};

export const logout = () => {
  store.commit("logout");

  instance.post("auth/signout").then(({ data }) => {
    openNotification(
      "Successfully DeAuthenticated!",
      "You will be redirected in 3 seconds.",
      "#108ee9",
      true,
      "/login"
    );
  });
};
