from django.urls import path
from . import views
urlpatterns = [
    path('', views.apiOverview, name="api"),
    path('gaseosas/', views.index, name="gaseosasIndex"),
    path('gaseosas/<int:pk>/', views.show, name="gaseosasShow"),
    path('gaseosas/<int:pk>/actualizar', views.update, name="gaseosasUpdate"),
    path('gaseosas/crear', views.create, name="gaseosasCreate"),
     path('gaseosas/<int:pk>/eliminar', views.delete, name="gaseosasDelete"),
  ]
