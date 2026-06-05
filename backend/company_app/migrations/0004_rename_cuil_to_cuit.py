from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ("company_app", "0003_alter_company_table"),
    ]

    operations = [
        migrations.RenameField(
            model_name="company",
            old_name="cuil",
            new_name="cuit",
        ),
    ]