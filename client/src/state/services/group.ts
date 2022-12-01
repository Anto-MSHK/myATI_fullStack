// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupMinT, GroupsStateI } from "../slices/group/types";

// Define a service using a base URL and expected endpoints
export const groupAPI = createApi({
  reducerPath: "groupAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://myati.onrender.com/" }),
  tagTypes: ["GroupsStateI"],
  endpoints: (build) => ({
    getGroups: build.query<GroupsStateI, void>({
      query: () => `group`,
      transformResponse: (response: any) => response.result,
      providesTags: (result) => ["GroupsStateI"],
    }),
  }),
});

export const { useGetGroupsQuery } = groupAPI;
