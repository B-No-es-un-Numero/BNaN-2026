from django.db import models

class STATUS_CHOICES(models.TextChoices):
    LEAD = 'lead', 'Lead'
    ACTIVE = 'active', 'Activo'
    CLOSED = 'closed', 'Cerrado'