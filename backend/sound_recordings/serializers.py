from rest_framework import serializers
from sound_recordings.models import SoundRecording, InputReport, InputReportMatch


class SoundRecordingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SoundRecording
        fields = ('artist', 'title', 'isrc', 'duration')


class InputReportMatchSerializer(serializers.ModelSerializer):
    sound_recording = SoundRecordingSerializer(read_only=True)

    class Meta:
        model = InputReportMatch
        fields = ('pk', 'sound_recording', 'similarity_score', 'selected')


class InputReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = InputReport
        fields = ('pk', 'artist', 'title', 'isrc',
                  'duration', 'matched')
