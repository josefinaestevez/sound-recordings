from rest_framework import serializers
from sound_recordings.models import InputReport, InputReportMatch


class InputReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = InputReport
        fields = ('pk', 'artist', 'title', 'isrc', 'duration', 'matched')
