import * as Types from "./../Constants/Traffic";

const initialState = {
  buyerTraffic: [],
  vendorTraffic: [],
  loaded: false,
  isError: false,
  errorMessage: "",
};

const TrafficReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TRAFFIC_LOADED_SUCCESS:
      return {
        ...state,
        buyerTraffic: [...action.payload.buyerTraffic],
        vendorTraffic: [...action.payload.vendorTraffic],
        loaded: true,
        isError: false,
        errorMessage: "",
      };
      break;

    case Types.TRAFFIC_LOADED_FAILED:
      return {
        ...state,
        buyerTraffic: [],
        vendorTraffic: [],
        loaded: true,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };
      break;

    case Types.START_TRAFFIC_BUFFERRING:
      return {
        ...state,

        loaded: false,
      };
      break;

    case Types.END_TRAFFIC_BUFFERRING:
      return {
        ...state,

        loaded: true,
      };
      break;

    default:
      return state;
  }
}; //..................Traffic Reducer

export default TrafficReducer;
