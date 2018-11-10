import {
	FETCH_INPUT_REPORTS_PENDING,
	FETCH_INPUT_REPORTS_SUCCESS,
	FETCH_INPUT_REPORTS_FAILURE,
	FETCH_MATCHES_PENDING,
	FETCH_MATCHES_SUCCESS,
	FETCH_MATCHES_FAILURE,
	SELECT_MATCH_PENDING,
	SELECT_MATCH_SUCCESS,
	SELECT_MATCH_FAILURE,
} from '../constants/actionTypes';

const defaultState = {
	isFetchingReports: false,
	isFetchingMatches: false,
	isSelectingMatch: false,
	reportsError: null,
	matchesError: null,
	selectMatchError: null,
	inputReports: [],
	matches: [],
	currentInputPk: null,
};

export default (state = defaultState, action) => {
	switch(action.type){
		case FETCH_INPUT_REPORTS_PENDING:
			return {
				...state,
				isFetchingReports: true,
			};
		case FETCH_INPUT_REPORTS_SUCCESS:
			return{
				...state,
				isFetchingReports: false,
				inputReports: action.inputReports,
			};
		case FETCH_INPUT_REPORTS_FAILURE:
			return{
				...state,
				isFetchingReports: false,
				reportsError: action.reportsError,
			};
		case FETCH_MATCHES_PENDING:
			return {
				...state,
				isFetchingMatches: true,
			};
		case FETCH_MATCHES_SUCCESS:
			return{
				...state,
				isFetchingMatches: false,
				currentInputPk: action.currentInputPk,
				matches: action.matches,
			};
		case FETCH_MATCHES_FAILURE:
			return{
				...state,
				isFetchingMatches: false,
				matchesError: action.matchesError,
			};
		case SELECT_MATCH_PENDING:
			return {
				...state,
				isSelectingMatch: true,
			};
		case SELECT_MATCH_SUCCESS:
			return{
				...state,
				inputReports: action.inputReports,
			};
		case SELECT_MATCH_FAILURE:
			return{
				...state,
				isSelectingMatch: false,
				selectMatchError: action.selectMatchError,
			};
		default: return state;
	}
}