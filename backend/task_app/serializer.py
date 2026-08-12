from rest_framework import serializers
from task_app.models import Task


class TaskSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()
    assigned_user_name = serializers.SerializerMethodField()
    client_id = serializers.IntegerField(
        source="client.id",
        read_only=True
    )
    assigned_user_id = serializers.IntegerField(
        source="assigned_user.id",
        read_only=True
    )

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = [
            'id',
            'created_at',
            'updated_at'
        ]

    def get_client_name(self, obj):
        return obj.client.name if obj.client else None

    def get_assigned_user_name(self, obj):
        if obj.assigned_user:
            full = f"{obj.assigned_user.first_name} {obj.assigned_user.last_name}".strip()
            return full or obj.assigned_user.username
        return None
