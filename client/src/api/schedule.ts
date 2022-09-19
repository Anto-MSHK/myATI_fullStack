import axios from "axios";

const instance = axios.create({
  //   headers: { "API-KEY": "c6caeb8a-704b-4474-b747-3243cd9e421f" },
  baseURL: ``,
  //   withCredentials: true,
});

export const scheduleApi = {
  getSchedule: (groupName: string) => {
    console.log(groupName);
    return axios
      .get(`http://192.168.100.8:5000/schedule/group?name=${groupName}`, {})
      .then((response) => {
        return response.data.result;
      });
  },
};
