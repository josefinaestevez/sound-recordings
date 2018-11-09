from django.db import models


class RecordBase(models.Model):
    artist = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    isrc = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoundRecording(RecordBase):
    pass


class InputReport(RecordBase):
    matched = models.BooleanField(default=False)


class InputReportMatch(models.Model):
    input_report = models.ForeignKey(
        InputReport, related_name='matches', on_delete=models.PROTECT)
    sound_recordings = models.ForeignKey(
        SoundRecording, on_delete=models.PROTECT)
    similarity_score = models.DecimalField(max_digits=2, decimal_places=1)
    selected = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
