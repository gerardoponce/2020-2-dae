from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import PrestamoSerializer
from .models import Prestamo

# Create your views here.

"""
API Overview para Prestamp
"""
@api_view(['GET'])
def apiOverviewPrestamo(request):
    api_urls = {
        'List' : 'listar',
        'Detail View' : '<int:pk>',
        'Create' : 'crear',
        'Update' : '<int:pk>/actualizar',
        'Delete' : 'eliminar',
    }
    return Response(api_urls)

@api_view(['GET'])
def listarPrestamos(request):
    prestamos = Prestamo.objects.all()
    serializer = PrestamoSerializer(prestamos, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def listarPrestamo(request, pk):
    prestamo = Prestamo.objects.get(id=pk)
    serializer = PrestamoSerializer(prestamo, many = False)
    return Response(serializer.data)

@api_view(['PUT'])
def actualizarPrestamo(request, pk):
    prestamo = Prestamo.objects.get(id = pk)
    serializer = PrestamoSerializer(instance=prestamo, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def crearPrestamo(request):
    serializer = PrestamoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def eliminarPrestamo(request, pk):
    prestamo = Prestamo.objects.get(id = pk)
    prestamo.delete()
    return Response("Prestamo eliminado satisfactoriamente.")
