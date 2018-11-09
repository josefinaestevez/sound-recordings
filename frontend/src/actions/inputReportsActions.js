import {
	FETCH_INPUT_REPORTS_PENDING,
	FETCH_INPUT_REPORTS_SUCCESS,
	FETCH_INPUT_REPORTS_FAILURE,
} from '../constants/actionTypes';

export const fetchInputReportsPending = () => {
	return {
		type: FETCH_INPUT_REPORTS_PENDING
	}
}

export const fetchInputReportsSuccess = (input_reports) => {
	return {
		type: FETCH_INPUT_REPORTS_SUCCESS,
		payload: input_reports,
	}
}

export const fetchInputReportsFailure = (error) => {
	return {
		type: FETCH_INPUT_REPORTS_FAILURE,
		payload: error,
	}
}

export function fetchInputReports() {
  return dispatch => {
    dispatch(fetchInputReportsPending());
    return fetch("http://localhost:8000/sound_recordings/input_reports/")
      .then(handleErrors)
      .then(res => res.json())
      .then(input_reports => {
        dispatch(fetchInputReportsSuccess(input_reports));
        return input_reports;
      })
      .catch(error => dispatch(fetchInputReportsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}