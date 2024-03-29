import { $api } from "./http";

export const scheduleApi = {
  getSchedule: async (groupName: string) => {
    return await $api
      .get(`/schedule/group?name=${groupName}`)
      .then((response) => {
        return response.data.result;
      })
      .catch((err) => console.log(err));
  },
};
