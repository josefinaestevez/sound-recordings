from django.contrib import admin
from sound_recordings.models import SoundRecording, InputReport, InputReportMatch


class InputReportMatchInLine(admin.TabularInline):
    model = InputReportMatch


class InputReportAdmin(admin.ModelAdmin):
    inlines = [
        InputReportMatchInLine
    ]

admin.site.register(SoundRecording)
admin.site.register(InputReport, InputReportAdmin)
admin.site.register(InputReportMatch)
