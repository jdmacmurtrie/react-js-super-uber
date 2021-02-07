// action types
const CUSTOMER_UPDATE = "CUSTOMER_UPDATE";

// action creators
const updateCustomer = (payload) => ({
  type: CUSTOMER_UPDATE,
  payload,
});

export const actions = {
  updateCustomer,
};

let initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  zipCode: "",
};

// reducers
export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
