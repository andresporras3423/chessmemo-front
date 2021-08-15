import {
    GET_CONFIG,
  } from '../types/index';
  
  export const getConfig = nConfig => ({
    type: GET_CONFIG,
    DifficultyId: nConfig.DifficultyId,
    questions: nConfig.questions,
  });
  
  
  export default {
    getConfig,
  };
  