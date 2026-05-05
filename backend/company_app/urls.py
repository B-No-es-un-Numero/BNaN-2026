from django.urls import path
from .views import CompanyView
urlpatterns = [
    path('companies/', CompanyView.as_view()),
    path('companies/<uuid:pk>/', CompanyView.as_view()),
]