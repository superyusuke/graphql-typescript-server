type Author = {
  name: string;
  id: string;
};

export type Context = {
  authors: Author[];
  moviesAPI: any;
};
