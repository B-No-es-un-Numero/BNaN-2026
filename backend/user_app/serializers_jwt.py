from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'] = serializers.EmailField(label='Email')
        self.fields.pop('email', None)

    def validate(self, attrs):
        email = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                {'detail': 'Credenciales inválidas. Verificá tu email y contraseña.'},
                code='authorization'
            )

        if not user.enabled:
            raise serializers.ValidationError(
                {'detail': 'Esta cuenta está deshabilitada.'},
                code='authorization'
            )

        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': user.role
        }
