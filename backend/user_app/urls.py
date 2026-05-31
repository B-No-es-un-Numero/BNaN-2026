from django.urls import path
from .views import UserView, RegisterView

urlpatterns = [ path('register', RegisterView.as_view()),
                path('usuarios', UserView.as_view()),
                path('usuarios/<int:pk>/', UserView.as_view()),
                ]