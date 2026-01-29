from django.contrib import admin
from .models import User 
from posts.models import Post 
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "email", "telefone", "papel", "perfil", "data_criacao", "senha")
    search_fields = ("nome", "email", "telefone", "cpf")
    list_filter = ("papel", "perfil", "data_criacao")

admin.site.register(Post)

