from rest_framework import serializers
from django.utils import timezone
from task_app.models import Task
from task_app.enum import STATUS_CHOICES


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

    def validate(self, attrs):
        status = attrs.get('status', getattr(self.instance, 'status', None))
        due_date = attrs.get('due_date', getattr(self.instance, 'due_date', None))

        if status in (STATUS_CHOICES.PENDING, STATUS_CHOICES.IN_PROGRESS):
            if due_date is None:
                raise serializers.ValidationError(
                    {"due_date": "Las tareas pendientes o en progreso deben tener una fecha límite."}
                )
            if due_date < timezone.localdate():
                raise serializers.ValidationError(
                    {"due_date": "La fecha límite no puede ser anterior a hoy para tareas pendientes o en progreso."}
                )

        return attrs
