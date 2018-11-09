from django.db import models
from django.db.models import Q

from sound_recordings.utils import similar


class RecordBase(models.Model):
    artist = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    isrc = models.CharField(max_length=20)
    duration = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return '%s - %s - %s - %s' % (self.artist, self.title, self.isrc, self.duration)


class SoundRecording(RecordBase):
    pass


class InputReport(RecordBase):
    matched = models.BooleanField(default=False)

    def create_match(self, entry):
        metadata = ['artist', 'title', 'isrc', 'duration']
        rank = sum(similar(getattr(self, m), getattr(entry, m))
                   for m in metadata) / len(metadata)
        match = InputReportMatch(
            sound_recording=entry, input_report=self, similarity_score=rank)
        return match

    def set_matches(self):
        search_artist = Q(artist__search=self.artist)
        search_title = Q(title__search=self.title)
        search_isrc = Q(isrc__search=self.isrc)
        search_duration = Q(duration__search=self.duration)
        matched_recordings = SoundRecording.objects.filter(
            search_artist | search_title | search_isrc | search_duration)
        matches = list(map(lambda x: self.create_match(x), matched_recordings))
        InputReportMatch.objects.bulk_create(matches)


class InputReportMatch(models.Model):
    input_report = models.ForeignKey(
        InputReport, related_name='matches', on_delete=models.PROTECT)
    sound_recording = models.ForeignKey(
        SoundRecording, on_delete=models.PROTECT)
    similarity_score = models.DecimalField(max_digits=2, decimal_places=1)
    selected = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
    	return '%s / %s SCORE: %s' % (self.sound_recording, self.input_report, self.similarity_score)
