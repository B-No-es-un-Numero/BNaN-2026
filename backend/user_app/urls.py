from django.urls import path
from .views import UserView, RegisterView, CurrentUserView
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView, )

urlpatterns = [ path('auth/register/', RegisterView.as_view()),
                path('usuarios', UserView.as_view()),
                path('usuarios/<int:pk>/', UserView.as_view()),
                path('auth/login/', TokenObtainPairView.as_view()),
                path('auth/refresh/', TokenRefreshView.as_view()),
                path('auth/me/', CurrentUserView.as_view()),
                ]