import {
  AddContactRequest,
  AddContactResponse,
  Contact,
  DeleteContactResponse,
  GetContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from "../../types";
import apiClient from "../infrastructure/client";
import { ENDPOINTS } from "../infrastructure/endpoint";
import { mockDelay, shouldUseMockData } from "../infrastructure/mock-data";

// Contact Management API - enhanced with robust error handling and mock fallbacks
export const contactsApi = {
  // Add new contact
  add: async (request: AddContactRequest): Promise<AddContactResponse> => {
    try {
      const response = await apiClient.post<AddContactResponse>(
        ENDPOINTS.CONTACT.ADD,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add contact: ${error}`);
    }
  },

  // Get all contacts
  getAll: async (): Promise<GetContactsResponse> => {
    try {
      const response = await apiClient.get<GetContactsResponse>(
        ENDPOINTS.CONTACT.GET_ALL
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch contacts: ${error}`);
    }
  },

  // Update contact
  update: async (
    id: string,
    request: UpdateContactRequest
  ): Promise<UpdateContactResponse> => {
    if (shouldUseMockData()) {
      await mockDelay();
      return {
        msg: "Contact updated successfully (mock)",
      };
    }

    try {
      const response = await apiClient.patch<UpdateContactResponse>(
        ENDPOINTS.CONTACT.UPDATE(id),
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update contact: ${error}`);
    }
  },

  // Delete contact
  delete: async (id: string): Promise<DeleteContactResponse> => {
    try {
      const response = await apiClient.delete<DeleteContactResponse>(
        ENDPOINTS.CONTACT.DELETE(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete contact: ${error}`);
    }
  },

  // Get contact by ID
  getById: async (id: string): Promise<Contact> => {
    try {
      const response = await apiClient.get<{ contact: Contact }>(
        `${ENDPOINTS.CONTACT.GET_ALL}/${id}`
      );
      return response.data.contact;
    } catch (error) {
      throw new Error(`Failed to fetch contact: ${error}`);
    }
  },
};
