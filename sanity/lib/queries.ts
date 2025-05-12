import { defineQuery } from "next-sanity";

// Main plants query - Fixed to make $search optional
export const PLANTS_QUERY = defineQuery(`*[_type == "plant" && defined(slug.current)] | order(_createdAt desc) {
  _id, 
  name,
  scientificName,
  slug,
  _createdAt,
  author -> {
    _id, name, expertise, image
  }, 
  likes,
  description,
  category,
  region,
  mainImage,
  medicinalProperties,
  cultivationTips
}`);

// Single plant query
export const PLANT_QUERY = defineQuery(`*[_type == "plant" && slug.current == $slug][0] {
  _id,
  name,
  scientificName,
  slug,
  _createdAt,
  author -> {
    _id, name, expertise, image
  },
  likes,
  description,
  category,
  region,
  mainImage,
  medicinalProperties,
  cultivationTips,
  traditionalUses,
  conservationStatus
}`);

// For search functionality
export const SEARCH_PLANTS_QUERY = defineQuery(`*[_type == "plant" && defined(slug.current) && (name match $searchTerm || scientificName match $searchTerm || description match $searchTerm)] | order(_createdAt desc) {
  _id, 
  name,
  scientificName,
  slug,
  _createdAt,
  author -> {
    _id, name, expertise, image
  }, 
  likes,
  description,
  category,
  region,
  mainImage,
  medicinalProperties,
  cultivationTips
}`);

// Similar plants query
export const SIMILAR_PLANTS_QUERY = defineQuery(`*[_type == "plant" && category == $category && slug.current != $currentSlug] | order(_createdAt desc)[0...3] {
  _id,
  name,
  scientificName,
  slug,
  _createdAt,
  author -> {
    _id, name, image
  },
  likes,
  description,
  category,
  mainImage
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    expertise,
    isAdmin,
    pendingApproval,
    createdAt
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    expertise,
    isAdmin,
    pendingApproval,
    createdAt
}
`);

export const PLANTS_BY_AUTHOR_QUERY = defineQuery(`*[_type == "plant" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  name,
  scientificName,
  slug,
  _createdAt,
  author -> {
    _id, name, image, expertise
  }, 
  likes,
  description,
  category,
  region,
  mainImage,
}`);
