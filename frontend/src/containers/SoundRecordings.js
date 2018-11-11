import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SoundRecordingsView from '../components/SoundRecordings'
import { fetchInputReports, fetchMatches, selectMatch } from '../actions/inputReportsActions'

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchInputReports,
	fetchMatches,
	selectMatch,
}, dispatch)

const mapStateToProps = state => {
	return {
		isFetchingReports: state.soundRecordingsReducer.isFetchingReports,
		isFetchingMatches: state.soundRecordingsReducer.isFetchingMatches,
		reportsError: state.soundRecordingsReducer.reportsError,
		matchesError: state.soundRecordingsReducer.matchesError,
		inputReports: state.soundRecordingsReducer.inputReports,
		currentInputPk: state.soundRecordingsReducer.currentInputPk,
		matches: state.soundRecordingsReducer.matches,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundRecordingsView);