from django.db import models

# Create your models here.
from django.utils import timezone

class Post(models.Model):

    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('resolvido', 'Resolvido'),
        ('rejeitado', 'Rejeitado'),
    ]

    CATEGORIA_CHOICES = [
        ('iluminacao', 'Iluminação Pública'),
        ('lixo', 'Lixo / Entulho'),
        ('seguranca', 'Segurança'),
        ('buraco', 'Buraco na Via'),
        ('outros', 'Outros'),
    ]

    autor = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        related_name='posts'
    )

    titulo = models.CharField(max_length=150)
    descricao = models.TextField()

    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pendente'
    )

    localizacao = models.CharField(max_length=255)

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    imagem = models.ImageField(
        upload_to='posts/',
        null=True,
        blank=True
    )

    criado_em = models.DateTimeField(default=timezone.now)

    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titulo} - {self.autor.nome}"
