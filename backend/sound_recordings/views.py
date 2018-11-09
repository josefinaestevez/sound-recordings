from rest_framework.views import APIView
from rest_framework.response import Response
from sound_recordings.models import InputReport
from sound_recordings.serializers import InputReportSerializer


class InputReportList(APIView):
    """
    List all input reports
    """

    def get(self, request, format=None):
        input_reports = InputReport.objects.filter(
            matched=False).order_by('artist', 'title')
        serializer = InputReportSerializer(input_reports, many=True)
        return Response(serializer.data)