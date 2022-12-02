// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupMinT } from "../slices/group/types";

// Define a service using a base URL and expected endpoints
export const groupAPI = createApi({
  reducerPath: "groupAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://myati.onrender.com/" }),
  tagTypes: ["GroupMinT"],
  endpoints: (build) => ({
    getGroups: build.query<GroupMinT[], { faculty: string; course: string }>({
      query: ({ faculty, course }) =>
        `group?faculty=${faculty}&course=${course}`,
      transformResponse: (response: any) => response.result,
      providesTags: (result) => ["GroupMinT"],
    }),
  }),
});

export const { useGetGroupsQuery } = groupAPI;
