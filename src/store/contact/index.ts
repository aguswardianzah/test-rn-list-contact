import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../../models/contact";

export const contactApi = createApi({
  reducerPath: 'contact',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://contact.herokuapp.com/' }),
  endpoints: builder => ({
    getContacts: builder.query<Contact[], void>({
      query: _ => 'contact',
      transformResponse: res => (res as { data: Contact[] })?.data
    }),
    getOneContact: builder.query<Contact, string>({
      query: id => ({ url: `contact/${id}` }),
      transformResponse: res => (res as { data: Contact })?.data
    }),
    insertContact: builder.mutation<any, Omit<Contact, 'id'>>({
      query: contact => ({
        url: 'contact',
        method: 'post',
        body: contact,
      })
    }),
    updateContact: builder.mutation<any, Contact>({
      query: contact => ({
        url: `contact/${contact.id}`,
        method: 'put',
        body: contact
      })
    }),
    deleteContact: builder.mutation<undefined, string>({
      query: id => ({
        url: `contact/${id}`,
        method: 'delete',
      })
    }),
  })
})

export const {
  useGetContactsQuery,
  useGetOneContactQuery,
  useInsertContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactApi