from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client_app', '0004_alter_client_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='status',
            field=models.CharField(
                choices=[
                    ('lead', 'Lead'),
                    ('active', 'Activo'),
                    ('closed', 'Cerrado'),
                ],
                default='lead',
                help_text='Estado del cliente.',
                max_length=10,
            ),
        ),
    ]
