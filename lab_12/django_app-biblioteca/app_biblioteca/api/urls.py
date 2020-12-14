from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverviewPrestamo, name = "api-overview-prestamo"),
    path('listar', views.listarPrestamos, name = "listar-prestamos"),
    path('<int:pk>', views.listarPrestamo, name = "listar-prestamo"),
    path('<int:pk>/actualizar', views.actualizarPrestamo, name = "actualizar-prestamo"),
    path('crear', views.crearPrestamo, name = "crear-prestamo"),
    path('<int:pk>/eliminar', views.eliminarPrestamo, name = "eliminar-prestamo")
]
