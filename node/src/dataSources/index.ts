import RestaurantAPI from "src/dataSources/RestaurantAPI";

export type DataSources = {
  restaurantAPI: RestaurantAPI;
};

export const dataSources = {
  restaurantAPI: new RestaurantAPI()
};
