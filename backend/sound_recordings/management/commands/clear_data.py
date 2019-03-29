from django.core.management.base import BaseCommand

from sound_recordings.models import SoundRecording, InputReport, InputReportMatch


class Command(BaseCommand):
    """
    Remove all data of our models
    """

    def handle(self, *args, **kwargs):
        InputReportMatch.objects.all().delete()
        InputReport.objects.all().delete()
        SoundRecording.objects.all().delete()
