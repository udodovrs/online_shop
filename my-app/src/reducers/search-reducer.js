import { ACTION_TYPE } from "../constants/action-type";

const initialSearchState = {
  searchPhrase: "",
  category: "",
  decrease: false,
  increase: false,
  updateSearch: false,
  page: 1,
};

export const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CATEGORY:
      return {
        ...state,
        updateSearch: !state.updateSearch,
        category: action.payload,
      };
    case ACTION_TYPE.DECREASE_SORT:
      return {
        ...state,
        updateSearch: !state.updateSearch,
        decrease: action.payload,
        increase: false,
      };
    case ACTION_TYPE.INCREASE_SORT:
      return {
        ...state,
        updateSearch: !state.updateSearch,
        increase: action.payload,
        decrease: false,
      };
    case ACTION_TYPE.SET_SEARCH_PHRASE:
      return {
        ...state,
        updateSearch: !state.updateSearch,
        searchPhrase: action.payload,       
      };
    case ACTION_TYPE.DELETE_SEARCH_PHRASE:
      return {
        ...state,        
        searchPhrase: '',       
      };
    case ACTION_TYPE.SET_FIRST_PAGE_TO_PAG:
      return {
        ...state,        
        updateSearch: !state.updateSearch,
        page: 1,       
      };
    case ACTION_TYPE.SET_SECOND_PAGE_TO_PAG:
      return {
        ...state,        
        updateSearch: !state.updateSearch,
        page: state.page + 1,       
      };
    case ACTION_TYPE.SET_PREVIOUS_PAGE_TO_PAG:
      return {
        ...state,        
        updateSearch: !state.updateSearch,
        page: state.page - 1,       
      };
    case ACTION_TYPE.SET_LAST_PAGE_TO_PAG:
      return {
        ...state,        
        updateSearch: !state.updateSearch,
        page: action.payload,    
      };
    default:
      return state;
  }
};
