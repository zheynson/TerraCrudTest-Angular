export interface Todo {
  id?: number;
  title: string;
  text: any;
  image: string;
  url: string;
  active: number;
  sort_order: null;
  created_at: string;
  updated_at: null | Date;
  deleted_at: null | Date;
}
