from django.contrib import admin
from django.urls import include, path

urlpatterns = [ path('', include('client_app.urls')), 
               path('admin/', admin.site.urls),
               path('api/', include('client_app.urls')), 
               path('api/', include('company_app.urls')), ]