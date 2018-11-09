import csv

from django.core.management.base import BaseCommand

from sound_recordings.models import InputReport


class Command(BaseCommand):
    """
    Load an Input Report.
    From a .csv file with the following rows:
    Artist, Title, ISRC, Duration
    """

    help = 'Give the path to the CSV file'

    def add_arguments(self, parser):
        parser.add_argument('file_name', type=str,
                            help='Indicates the csv file name')

    def handle(self, *args, **kwargs):

        filename = kwargs['file_name']
        input_records = []

        with open(filename) as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                input_record = InputReport(artist=row['artist'],
                                           title=row['title'],
                                           isrc=row['isrc'],
                                           duration=row['duration'])
                input_records.append(input_record)

        InputReport.objects.bulk_create(input_records)

        for input_report in input_records:
            input_report.set_matches()
