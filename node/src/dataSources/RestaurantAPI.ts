import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class RestaurantAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.gnavi.co.jp/RestSearchAPI/v3/";
  }

  public willSendRequest(request: RequestOptions) {
    request.params.set("keyid", process.env.GNAVI_API_ACCESS_KEYID as string);
  }

  getHoge() {
    return "hoge";
  }
}

export default RestaurantAPI;
