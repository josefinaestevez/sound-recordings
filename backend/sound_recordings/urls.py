from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from sound_recordings import views

urlpatterns = [
    path('input_reports/', views.InputReportList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
