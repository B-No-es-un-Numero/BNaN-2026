from django.db import models
from django.conf import settings
from client_app.models import Client
from task_app.enum import STATUS_CHOICES


class Task(models.Model):
    class Meta:
        db_table= "tareas";

    id = models.BigAutoField(primary_key=True, editable=False)

    title = models.CharField(
        max_length=150,
        help_text="Título breve de la tarea."
    )

    description = models.TextField(
        blank=True,
        null=True,
        help_text="Descripción detallada de la tarea."
    )

    due_date = models.DateField(
        blank=True,
        null=True,
        help_text="Fecha límite de la tarea."
    )

    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES.choices,
        default=STATUS_CHOICES.PENDING,
        help_text="Estado actual de la tarea."
    )

    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='tasks',
        help_text="Cliente asociado a la tarea."
    )

    assigned_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='assigned_tasks',
        help_text="Usuario asignado a la tarea."
    )

    enabled = models.BooleanField(
        default=True,
        help_text="Indica si la tarea está activa en el sistema."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.title} ({self.status})"