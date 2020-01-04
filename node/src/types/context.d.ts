import { DataSources } from "src/dataSources";

type Author = {
  name: string;
  id: string;
};

export type Context = {
  authors: Author[];
  dataSources: DataSources;
};
