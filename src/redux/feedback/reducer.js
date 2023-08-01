const INITIAL_STATE = {
  feedbacks: [],
};

export function formReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_FEEDBACK":
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };
    default:
      return state;
  }
}
