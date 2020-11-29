from rest_framework import serializers

from .models import Gaseosa

class GaseosaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gaseosa
        fields = '__all__'