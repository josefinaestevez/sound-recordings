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

export const fetchInputReportsPending = () => {
	return {
		type: FETCH_INPUT_REPORTS_PENDING
	}
}

export const fetchInputReportsSuccess = (inputReports) => {
	return {
		type: FETCH_INPUT_REPORTS_SUCCESS,
		inputReports,
	}
}

export const fetchInputReportsFailure = (reportsError) => {
	return {
		type: FETCH_INPUT_REPORTS_FAILURE,
		reportsError,
	}
}

export const fetchMatchesPending = () => {
	return {
		type: FETCH_MATCHES_PENDING
	}
}

export const fetchMatchesSuccess = (currentInputPk, matches) => {
	return {
		type: FETCH_MATCHES_SUCCESS,
		currentInputPk,
		matches,
	}
}

export const fetchMatchesFailure = (matchesError) => {
	return {
		type: FETCH_MATCHES_FAILURE,
		matchesError,
	}
}

export const selectMatchPending = () => {
	return {
		type: SELECT_MATCH_PENDING
	}
}

export const selectMatchSuccess = (matches) => {
	return {
		type: SELECT_MATCH_SUCCESS,
		matches,
	}
}

export const selectMatchFailure = (error) => {
	return {
		type: SELECT_MATCH_FAILURE,
		error,
	}
}

export function fetchMatches(inputReport) {
	return dispatch => {
	    dispatch(fetchMatchesPending());
	    return fetch('http://localhost:8000/sound_recordings/input_reports/'+inputReport.pk+'/matches')
	      .then(res => res.json())
	      .then(matches => {
	        dispatch(fetchMatchesSuccess(inputReport.pk, matches));
	      })
	      .catch(error => dispatch(fetchMatchesFailure(error)));
	};
}

export function fetchInputReports() {
	return dispatch => {
	    dispatch(fetchInputReportsPending());
	    return fetch("http://localhost:8000/sound_recordings/input_reports/")
	      .then(res => res.json())
	      .then(inputReports => {
	        dispatch(fetchInputReportsSuccess(inputReports));
	      })
	      .catch(error => dispatch(fetchInputReportsFailure(error)));
	};
}