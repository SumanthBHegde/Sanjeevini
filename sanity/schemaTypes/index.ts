import { type SchemaTypeDefinition } from "sanity";

import { author } from "./author";
import { plant } from "./plant";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, plant],
};
