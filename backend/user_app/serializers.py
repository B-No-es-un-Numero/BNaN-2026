from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=False);
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'role',
            'enabled',
            'date_joined',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None);
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value);

        if password:
            instance.set_password(password);
            
        instance.save();
        return instance;


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True);

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data, role='user', enabled=True)
        user.set_password(password)
        user.save()
        return user
