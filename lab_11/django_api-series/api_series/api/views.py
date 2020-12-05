from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SerieSerializer
from .models import Serie

"""
APIs para Serie
"""
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Index' : '/series/',
        'Show' : '/series/<int:id>/',
        'Create' : '/series/crear/',
        'Update' : '/series/<int:id>/actualizar/',
        'Delete' : '/series/<int:id>/eliminar/',
    }

    return Response(api_urls)

@api_view(['GET'])
def index(request):
    series = Serie.objects.all()
    serializer = SerieSerializer(series, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def show(request, pk):
    serie = Serie.objects.get(id=pk)
    serializer = SerieSerializer(serie, many = False)
    return Response(serializer.data)

@api_view(['PUT'])
def update(request, pk):
    serie = Serie.objects.get(id = pk)
    serializer = SerieSerializer(instance=serie, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def create(request):
    serializer = SerieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete(request, pk):
    serie = Serie.objects.get(id = pk)
    serie.delete()
    return Response("Se eliminó la serie.")
