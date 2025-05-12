import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true, // Hide password field in the Sanity Studio UI
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    defineField({
      name: "expertise",
      title: "Expertise",
      type: "string",
      description: "Botanical expertise or specialization (e.g., Botanist, Herbalist)"
    }),
    defineField({
      name: "role",
      title: "User Role",
      type: "string",
      description: "The role of the user in the system",
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Editor', value: 'editor' },
          { title: 'Viewer', value: 'viewer' }
        ],
      },
      initialValue: 'viewer', // Default role is viewer
    }),
    defineField({
      name: "isAdmin",
      title: "Admin Status (Legacy)",
      type: "boolean",
      description: "Whether this user has admin privileges (use role field instead)",
      initialValue: false,
      hidden: true, // Hide this field as we'll use role instead
    }),
    defineField({
      name: "createdAt",
      title: "Joined",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
      readOnly: true,
    }),
    defineField({
      name: "pendingEditorRequest",
      title: "Pending Editor Request",
      type: "boolean",
      description: "Whether this user has requested editor privileges",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "image",
      role: "role"
    },
    prepare(selection) {
      const { title, subtitle, media, role } = selection;
      
      // Instead of directly returning the URL, we need to return
      // a proper component or undefined
      return {
        title,
        subtitle: `${subtitle} (${role || 'viewer'})`,
        media: media ? 
          // For URLs, just return undefined and let Sanity use the default icon
          undefined : UserIcon,
      };
    },
  },
});
