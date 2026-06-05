from django.db import models

class STATUS_CHOICES(models.TextChoices):
    PENDING = 'pending', 'Pendiente'
    IN_PROGRESS = 'in_progress', 'En progreso'
    CANCELLED = 'cancelled', 'Cancelada'
    DONE = 'done', 'Completada'
