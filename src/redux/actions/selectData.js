import { fetchSelectData } from "../../helpers/http";
import { GET_DATA_SELECT } from "../types/selectData";

export const getSelectData = () => {
  return {
    type: GET_DATA_SELECT,
    payload: fetchSelectData({ locations: "/vehicles/location", types: "/categories" })
  };
};
