from django.db import models

class STATUS_CHOICES(models.TextChoices):
    Lead = "lead"
    Activo = "active"
    Cerrado = "closed"