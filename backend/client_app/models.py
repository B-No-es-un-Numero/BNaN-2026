import uuid
from django.db import models
from django.core.validators import RegexValidator

class Client(models.Model):
    STATUS_CHOICES = [
        ('lead', 'Lead'),
        ('active', 'Activo'),
        ('closed', 'Cerrado'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(
        max_length=100,
        help_text="Nombre completo del cliente."
    )

    email = models.EmailField(
        unique=True,
        help_text="Correo electrónico único."
    )

    dni = models.CharField(
        max_length=8,
        unique=True,
        validators=[RegexValidator(r'^\d{7,8}$')],
        help_text="Número de documento (7 u 8 dígitos)."
    )

    date_of_birth = models.DateField(
        help_text="Fecha de nacimiento."
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Teléfono de contacto."
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='lead',
        help_text="Estado del cliente."
    )

    company_id = models.UUIDField(
        null=True,
        blank=True,
        help_text="ID de la empresa asociada (placeholder)."
    )

    responsible_user_id = models.UUIDField(
        null=True,
        blank=True,
        help_text="ID del usuario responsable (placeholder)."
    )

    enabled = models.BooleanField(
        default=True,
        help_text="Indica si el cliente está activo en el sistema."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.name} ({self.status})"
