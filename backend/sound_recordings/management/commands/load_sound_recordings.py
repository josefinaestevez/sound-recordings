import csv

from django.core.management.base import BaseCommand

from sound_recordings.models import SoundRecording


class Command(BaseCommand):
    """
    Load Sound Recordings.
    From a .csv file with the following rows:
    Artist, Title, ISRC, Duration
    """

    help = 'Give the path to the CSV file'

    def add_arguments(self, parser):
        parser.add_argument('file_name', type=str,
                            help='Indicates the csv file name')

    def handle(self, *args, **kwargs):

        filename = kwargs['file_name']
        sound_recordings = []

        with open(filename) as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                sound_record = SoundRecording(artist=row['artist'],
                                              title=row['title'],
                                              isrc=row['isrc'],
                                              duration=row['duration'])
                sound_recordings.append(sound_record)

            SoundRecording.objects.bulk_create(sound_recordings)
