from django.db import models

# Modelo para la tabla gaseosas
class Gaseosa(models.Model):

    codigo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=5, decimal_places=2)
    objects = models.Manager()

    def __str__(self):
        return self.nombre