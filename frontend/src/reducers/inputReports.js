import {
	FETCH_INPUT_REPORTS_PENDING,
	FETCH_INPUT_REPORTS_SUCCESS,
	FETCH_INPUT_REPORTS_FAILURE,
} from '../constants/actionTypes';

const defaultState = {
	input_reports: [],
	error: null,
	is_fetching: false,
};

export default (state = defaultState, action) => {
	switch(action.type){
		case FETCH_INPUT_REPORTS_PENDING:
			return {
				...state,
				is_fetching: true,
			};
		case FETCH_INPUT_REPORTS_SUCCESS:
			return{
				...state,
				input_reports: action.payload,
				is_fetching: false
			};
		case FETCH_INPUT_REPORTS_FAILURE:
			return{
				...state,
				is_fetching: false,
				error: action.payload
			};
		default: return state;
	}
}