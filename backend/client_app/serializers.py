from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source="company.name",
        read_only=True
    )
    
    responsible_name = serializers.CharField(
        source="responsible_user.email",
        read_only=True
    )
    
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = [
            'id',
            'created_at',
            'updated_at'
        ]
 