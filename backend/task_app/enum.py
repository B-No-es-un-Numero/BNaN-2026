from django.db import models

class STATUS_CHOICES(models.TextChoices):
    pending = "Pendiente"
    in_progress = "En progreso"
    cancelled = "Cancelada"
    done = "Completada"
