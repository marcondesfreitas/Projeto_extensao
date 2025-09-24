from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone 

class User(models.Model):
    PERFIL_CHOICES = [ 
        ('publico', 'Público'),
        ('privado', 'Privado'),
    ]

    PAPEL_CHOICES = [ 
        ('usuario', 'Usuário'),
        ('moderador', 'Moderador'),
        ('admin', 'Admin'),
    ]

    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)  
    telefone = models.CharField(max_length=20, unique=True)
    perfil = models.CharField(max_length=20, choices=PERFIL_CHOICES, default='publico')
    papel = models.CharField(max_length=20, choices=PAPEL_CHOICES, default='usuario')
    data_criacao = models.DateTimeField(auto_now_add=True)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    localizacao = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, unique=True)
    comprovante_residencia = models.ImageField(upload_to='comprovantes/', blank=True, null=True)

    def __str__(self):
        return self.nome



class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return timezone.now() - self.created_at <= timedelta(hours=1)