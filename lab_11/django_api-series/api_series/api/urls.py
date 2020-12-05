from django.urls import path
from . import views
urlpatterns = [
    path('', views.apiOverview, name="api"),
    path('series/', views.index, name="seriesIndex"),
    path('series/<int:pk>/', views.show, name="seriesShow"),
    path('series/<int:pk>/actualizar/', views.update, name="seriesUpdate"),
    path('series/crear/', views.create, name="seriesCreate"),
    path('series/<int:pk>/eliminar/', views.delete, name="seriesDelete"),
  ]
