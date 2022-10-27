import axios from "axios";
import { $api } from "./http";

export const groupApi = {
  getGroups: async () => {
    return await $api
      .get(`/group`)
      .then((response) => {
        return response.data.result;
      })
      .catch((err) => console.log(err));
  },
};
