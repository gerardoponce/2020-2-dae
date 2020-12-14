from django.contrib import admin
from .models import Usuario, Autor, Libro, Prestamo

# Register your models here.

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'direccion']


class AutorAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'nacionalidad']


class LibroAdmin(admin.ModelAdmin):

    model = Libro
    list_display = ['titulo', 'editorial', 'idAutor']
    
    def idAutor(self):
        return self.libro.idAutor
    
    idAutor.admin_order_field = 'libro__autor'


class PrestamoAdmin(admin.ModelAdmin):

    model = Prestamo
    list_display = ['id', 'idUsuario', 'idLibro', 'fechaPrestamo']

    def idUsuario(self):
        return self.prestamo.idUsuario
    
    def idLibro(self):
        return self.prestamo.idLibro

    idUsuario.admin_order_field = 'prestamo__usuario'
    idLibro.admin_order_field = 'prestamo__libro'


admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Autor, AutorAdmin)
admin.site.register(Libro, LibroAdmin)
admin.site.register(Prestamo, PrestamoAdmin)
