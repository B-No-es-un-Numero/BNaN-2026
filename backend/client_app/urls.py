from django.urls import path
from .views import ClientView

urlpatterns = [ path('clientes', ClientView.as_view()),
               path('clientes/<uuid:pk>/', ClientView.as_view()),
               ]