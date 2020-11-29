from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import GaseosaSerializer
from .models import Gaseosa

"""
APIs para Gaseosa
"""
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Index' : '/gaseosas/',
        'Show' : '/gaseosas/<int:pk>/',
        'Create' : '/gaseosas/crear',
        'Update' : '/gaseosas/<int:pk>/actualizar',
        'Delete' : '/gaseosas/<int:pk>/eliminar',
    }

    return Response(api_urls)

@api_view(['GET'])
def index(request):
    gaseosas = Gaseosa.objects.all()
    serializer = GaseosaSerializer(gaseosas, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def show(request, pk):
    gaseosa = Gaseosa.objects.get(codigo=pk)
    serializer = GaseosaSerializer(gaseosa, many = False)
    return Response(serializer.data)

@api_view(['PUT'])
def update(request, pk):
    gaseosa = Gaseosa.objects.get(codigo = pk)
    serializer = GaseosaSerializer(instance=gaseosa, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def create(request):
    serializer = GaseosaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete(request, pk):
    gaseosas = Gaseosa.objects.get(codigo = pk)
    gaseosas.delete()
    return Response("Se elminó la gaseosa.")
