# Generated by Django 5.0 on 2024-01-08 06:15

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Sales",
            fields=[
                (
                    "new_column",
                    models.CharField(
                        db_column="New_Column",
                        max_length=45,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "commercial_code",
                    models.IntegerField(
                        blank=True, db_column="Commercial_Code", null=True
                    ),
                ),
                (
                    "service_industry_name",
                    models.TextField(
                        blank=True, db_column="Service_Industry_Name", null=True
                    ),
                ),
                (
                    "administrative_district",
                    models.TextField(
                        blank=True, db_column="Administrative_District", null=True
                    ),
                ),
                (
                    "deposit_amount",
                    models.IntegerField(
                        blank=True, db_column="Deposit_Amount", null=True
                    ),
                ),
                (
                    "monthly_rent",
                    models.IntegerField(
                        blank=True, db_column="Monthly_Rent", null=True
                    ),
                ),
                (
                    "workplace",
                    models.FloatField(blank=True, db_column="Workplace", null=True),
                ),
                (
                    "resident",
                    models.FloatField(blank=True, db_column="Resident", null=True),
                ),
                ("male", models.FloatField(blank=True, db_column="Male", null=True)),
                (
                    "female",
                    models.FloatField(blank=True, db_column="Female", null=True),
                ),
                (
                    "monthly_average_sales",
                    models.IntegerField(
                        blank=True, db_column="Monthly_Average_Sales", null=True
                    ),
                ),
                (
                    "age_group_10s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_10s", null=True
                    ),
                ),
                (
                    "age_group_20s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_20s", null=True
                    ),
                ),
                (
                    "age_group_30s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_30s", null=True
                    ),
                ),
                (
                    "age_group_40s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_40s", null=True
                    ),
                ),
                (
                    "age_group_50s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_50s", null=True
                    ),
                ),
                (
                    "age_group_60s",
                    models.IntegerField(
                        blank=True, db_column="Age_Group_60s", null=True
                    ),
                ),
            ],
            options={
                "db_table": "sales",
                "managed": False,
            },
        ),
    ]
