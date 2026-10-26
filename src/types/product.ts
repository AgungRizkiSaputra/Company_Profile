// Types for Velmora Product Catalog & Procurement Specifications

export type ProductCategory =
  | 'industrial-supplies'
  | 'electrical-electronics'
  | 'safety-ppe'
  | 'office-supplies';

export interface ProductSpecification {
  key_en: string;
  key_id: string;
  val: string;
}

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  category_name_en: string;
  category_name_id: string;
  name_en: string;
  name_id: string;
  unit_en: string;
  unit_id: string;
  description_en: string;
  description_id: string;
  specs: ProductSpecification[];
  use_cases_en: string[];
  use_cases_id: string[];
  image: string;
  alt_en: string;
  alt_id: string;
}
