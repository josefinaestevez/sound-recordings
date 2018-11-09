from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from sound_recordings import views

urlpatterns = [
    path('input_reports/', views.InputReportList.as_view()),
    path('input_reports/<int:input_report_pk>/matches/<int:match_pk>', views.InputReportMatchDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
