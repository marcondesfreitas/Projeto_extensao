from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import users

# Serializer para JWT login
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        return data

# Serializer para cadastro
class RegisterSerializer(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True)

    class Meta:
        model = users
        fields = ['nome', 'email', 'telefone', 'cpf', 'localizacao', 'foto_perfil', 'comprovante_residencia', 'senha']

    def create(self, validated_data):
        senha = validated_data.pop('senha')
        user = users(**validated_data)
        user.username = validated_data['email']  # obrigatório para JWT
        user.set_password(senha)                 # ⚡ hash da senha
        user.is_active = True
        user.save()
        return user
