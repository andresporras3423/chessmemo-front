import { GET_CONFIG } from '../types/index';

const configReducer = (state = {
  DifficultyId: 0,
  questions: 10,
}, action) => {
  switch (action.type) {
    case GET_CONFIG: return {
      ...state,
      DifficultyId: action.DifficultyId,
      questions: action.questions,
    }
    default: return state;
  }
};

export default configReducer;