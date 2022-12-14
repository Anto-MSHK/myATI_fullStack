// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DayT } from "../slices/group/types";

// Define a service using a base URL and expected endpoints
export const scheduleAPI = createApi({
  reducerPath: "scheduleAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://myati.onrender.com/" }),
  tagTypes: ["DayT"],
  endpoints: (build) => ({
    getSchedule: build.query<DayT[], string>({
      query: (name) => `schedule/group?name=${name}`,
      transformResponse: (response: any) => {
        return (response.result as DayT[]).sort(
          (a, b) => a.dayOfWeek - b.dayOfWeek
        );
      },
      providesTags: (result) => ["DayT"],
    }),
  }),
});

export const { useGetScheduleQuery } = scheduleAPI;
