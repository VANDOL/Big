from django.db import models

# Create your models here.
class Sales(models.Model):
    new_column = models.CharField(db_column='New_Column', primary_key=True, max_length=45)  # Field name made lowercase.
    commercial_code = models.IntegerField(db_column='Commercial_Code', blank=True, null=True)  # Field name made lowercase.
    service_industry_name = models.TextField(db_column='Service_Industry_Name', blank=True, null=True)  # Field name made lowercase.
    administrative_district = models.TextField(db_column='Administrative_District', blank=True, null=True)  # Field name made lowercase.
    deposit_amount = models.IntegerField(db_column='Deposit_Amount', blank=True, null=True)  # Field name made lowercase.
    monthly_rent = models.IntegerField(db_column='Monthly_Rent', blank=True, null=True)  # Field name made lowercase.
    workplace = models.FloatField(db_column='Workplace', blank=True, null=True)  # Field name made lowercase.
    resident = models.FloatField(db_column='Resident', blank=True, null=True)  # Field name made lowercase.
    male = models.FloatField(db_column='Male', blank=True, null=True)  # Field name made lowercase.
    female = models.FloatField(db_column='Female', blank=True, null=True)  # Field name made lowercase.
    monthly_average_sales = models.IntegerField(db_column='Monthly_Average_Sales', blank=True, null=True)  # Field name made lowercase.
    age_group_10s = models.IntegerField(db_column='Age_Group_10s', blank=True, null=True)  # Field name made lowercase.
    age_group_20s = models.IntegerField(db_column='Age_Group_20s', blank=True, null=True)  # Field name made lowercase.
    age_group_30s = models.IntegerField(db_column='Age_Group_30s', blank=True, null=True)  # Field name made lowercase.
    age_group_40s = models.IntegerField(db_column='Age_Group_40s', blank=True, null=True)  # Field name made lowercase.
    age_group_50s = models.IntegerField(db_column='Age_Group_50s', blank=True, null=True)  # Field name made lowercase.
    age_group_60s = models.IntegerField(db_column='Age_Group_60s', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'sales'
        
class Swot(models.Model):
    new_column = models.CharField(db_column='New_Column', primary_key=True, max_length=255)  # Field name made lowercase.
    name = models.TextField(blank=True, null=True)
    dong = models.TextField(blank=True, null=True)
    s = models.TextField(db_column='S', blank=True, null=True)  # Field name made lowercase.
    w = models.TextField(db_column='W', blank=True, null=True)  # Field name made lowercase.
    o = models.TextField(db_column='O', blank=True, null=True)  # Field name made lowercase.
    t = models.TextField(db_column='T', blank=True, null=True)  # Field name made lowercase.
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'swot'