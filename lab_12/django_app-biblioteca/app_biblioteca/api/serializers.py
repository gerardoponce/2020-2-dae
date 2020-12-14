from rest_framework import serializers

from .models import Prestamo, Usuario, Libro

class UsuarioSerializar(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre']

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ['titulo']

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'
        


    