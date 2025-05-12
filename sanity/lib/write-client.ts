import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

if (typeof window !== "undefined") {
  throw new Error("Sanity client should only run on the server.");
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});


if (!writeClient.config().token) {
  console.error("Token is undefined or empty:", writeClient.config());
  throw new Error("Write token not found.");
}
