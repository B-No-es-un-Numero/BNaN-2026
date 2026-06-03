from django.urls import path
from .views import UserView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers_jwt import EmailTokenObtainPairSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('usuarios', UserView.as_view()),
    path('usuarios/<int:pk>/', UserView.as_view()),
    path('auth/login/', EmailTokenObtainPairView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
]