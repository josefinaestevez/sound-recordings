from django.http import Http404

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from sound_recordings.models import InputReport, InputReportMatch
from sound_recordings.serializers import InputReportSerializer, InputReportMatchSerializer


class InputReportList(generics.ListAPIView):
    queryset = InputReport.objects.all()
    serializer_class = InputReportSerializer

    def get_queryset(self):
        queryset = self.queryset.order_by('artist', 'title')
        matched = self.request.query_params.get('matched', None)
        if matched is not None:
            queryset = queryset.filter(matched=matched)
        return queryset


class InputReportMatchesList(APIView):
    """
    List all matches for an input report
    """

    def get(self, request, input_report_pk, format=None):
        matches = InputReportMatch.objects.filter(
            input_report__pk=input_report_pk).order_by('-similarity_score')
        serializer = InputReportMatchSerializer(matches, many=True)
        return Response(serializer.data)


class InputReportMatchDetail(APIView):
    """
    Retrieve a input report match
    """

    def get_object(self, input_report_pk, match_pk):
        try:
            return InputReportMatch.objects.get(pk=match_pk, input_report__pk=input_report_pk)
        except InputReportMatch.DoesNotExist:
            raise Http404

    def get(self, request, input_report_pk, match_pk, format=None):
        input_report_match = self.get_object(input_report_pk, match_pk)
        serializer = InputReportMatchSerializer(input_report_match)
        return Response(serializer.data)

    def put(self, request, input_report_pk, match_pk, format=None):
        input_report_match = self.get_object(input_report_pk, match_pk)
        serializer = InputReportMatchSerializer(
            input_report_match, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
