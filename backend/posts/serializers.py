from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    autor_nome = serializers.CharField(source='autor.nome', read_only=True)
    autor_id = serializers.CharField(source='autor.id', read_only=True)
    imagem = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Post
        fields = [
            'id',
            'autor_id',
            'autor_nome',
            'titulo',
            'descricao',
            'categoria',
            'status',
            'localizacao',
            'latitude',
            'longitude',
            'imagem',
            'criado_em',
        ]
        read_only_fields = ['status', 'autor']
