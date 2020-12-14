from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Usuario(models.Model):
    DIRECCION_CHOICES = [
        ('DIR1', 'Dirección 1'),
        ('DIR2', 'Dirección 2'),
        ('DIR3', 'Dirección 3'),
        ('DIR4', 'Dirección 4'),
        ('DIR5', 'Dirección 5')
    ]

    dni = models.CharField(max_length=8, unique=True, validators=[RegexValidator(r'^\d{1,11}$')])
    nombre = models.CharField(max_length=60)
    ruc = models.CharField(max_length=11, unique=True, validators=[RegexValidator(r'^\d{1,11}$')])
    direccion = models.CharField(max_length=4, choices=DIRECCION_CHOICES)
    telefono = models.CharField(max_length=9, unique=True, validators=[RegexValidator(r'^\d{1,10}$')])

    objects = models.Manager()
    
    def __str__(self):
        return self.nombre


class Autor(models.Model):

    NACIONALIDAD_CHOICES = [
        ('FRA', 'Francia'),
        ('PRU', 'Perú'),
        ('ESP', 'España'),
        ('CHI', 'Chile'),
        ('GRE', 'Grecia')
    ]

    nombre = models.CharField(max_length=60)
    nacionalidad = models.CharField(max_length=4, choices=NACIONALIDAD_CHOICES)

    objects = models.Manager()
    
    def __str__(self):
        return self.nombre


class Libro(models.Model):

    EDITORIAL_CHOICES = [
        ('ED1', 'Editorial Planeta'),
        ('ED2', 'Editorial Minotauro'),
        ('ED3', 'Editorial Sudamérica'),
        ('ED4', 'Editorial MIR'),
        ('ED5', 'Editorial Roma')
    ]

    titulo = models.CharField(max_length=60)
    isbn = models.CharField(max_length=13, unique=True, validators=[RegexValidator(r'^\d{1,11}$')])
    editorial = models.CharField(max_length=3, choices=EDITORIAL_CHOICES)
    numPags = models.CharField(max_length=4, validators=[RegexValidator(r'^\d{1,11}$')])
    idAutor = models.ForeignKey(Autor, on_delete=models.CASCADE)

    objects = models.Manager()
    
    def __str__(self):
        return self.titulo


class Prestamo(models.Model):

    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fechaPrestamo =  models.DateField()
    fechaDevolucion =  models.DateField()

    objects = models.Manager()
