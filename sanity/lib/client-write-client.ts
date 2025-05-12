import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

// This client is safe to use in client components
export const clientWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  // Adding stega false to prevent warnings in browser console
  stega: false,
});

if (!clientWriteClient.config().token) {
  console.warn("Client write token not found. Some write operations may fail.");
}