import { defineField, defineType } from "sanity";
import { LeafIcon } from "lucide-react";

export const plant = defineType({
  name: "plant",
  title: "Plant",
  type: "document",
  icon: LeafIcon,
  fields: [
    defineField({
      name: "name",
      title: "Plant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scientificName",
      title: "Scientific Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "likes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description (Markdown)",
      type: "text",
      description: "Detailed plant description with markdown formatting",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Medicinal", value: "medicinal" },
          { title: "Culinary", value: "culinary" },
          { title: "Ornamental", value: "ornamental" },
          { title: "Endangered", value: "endangered" }
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "url",
    }),
    defineField({
      name: "medicinalProperties",
      title: "Medicinal Properties",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cultivationTips",
      title: "Cultivation Tips",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "traditionalUses",
      title: "Traditional Uses",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "conservationStatus",
      title: "Conservation Status",
      type: "string",
      options: {
        list: [
          { title: "Not Threatened", value: "Not Threatened" },
          { title: "Near Threatened", value: "Near Threatened" },
          { title: "Vulnerable", value: "Vulnerable" },
          { title: "Endangered", value: "Endangered" },
          { title: "Critically Endangered", value: "Critically Endangered" }
        ]
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    // New fields for admin approval system
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Has this plant entry been approved by an admin?",
      initialValue: false,
    }),
    defineField({
      name: "approvedBy",
      title: "Approved By",
      type: "reference",
      to: { type: "author" },
      description: "Admin who approved this plant entry",
      hidden: ({ document }) => !document?.approved,
    }),
    defineField({
      name: "approvedAt",
      title: "Approved At",
      type: "datetime",
      description: "When this plant entry was approved",
      hidden: ({ document }) => !document?.approved,
    }),
    defineField({
      name: "rejectionReason",
      title: "Rejection Reason",
      type: "text",
      description: "Reason for rejection (if applicable)",
      hidden: ({ document }) => document?.approved === true,
    }),
    defineField({
      name: "pendingRevisions",
      title: "Pending Revisions",
      type: "boolean",
      description: "Does this plant entry have revisions awaiting approval?",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "scientificName",
      approved: "approved",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, approved, media } = selection;
      return {
        title,
        subtitle: `${subtitle || ''} ${approved ? '✓' : '(pending)'}`,
        media: media ? media : LeafIcon,
      };
    },
  },
});