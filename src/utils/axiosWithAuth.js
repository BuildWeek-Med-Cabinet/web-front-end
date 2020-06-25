import axios from "axios";

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");

  return axios.create({
    headers: {
      authorization: 'Bearer ' + token,
    },
    baseURL: "https://med-cabinet-build-week.herokuapp.com/",
  });
};
