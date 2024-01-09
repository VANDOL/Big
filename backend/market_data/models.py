from django.db import models

# Create your models here.
class Sales(models.Model):
    new_column = models.CharField(db_column='New_Column', primary_key=True, max_length=45)  # Field name made lowercase.
    commercial_code = models.IntegerField(db_column='Commercial_Code', blank=True, null=True)  # Field name made lowercase.
    service_industry_name = models.TextField(db_column='Service_Industry_Name', blank=True, null=True)  # Field name made lowercase.
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
        db_table = 'swotT'
        
        
class Fo(models.Model):
    myunknowncolumn = models.IntegerField(db_column='MyUnknownColumn', blank=True, null=True)  # Field name made lowercase.
    new_column = models.CharField(db_column='New_Column', primary_key=True, max_length=45)  # Field name made lowercase.
    reference_year_quarter_code = models.IntegerField(blank=True, null=True)
    commercial_area_code = models.IntegerField(blank=True, null=True)
    service_industry_code_name = models.TextField(blank=True, null=True)
    total_sales_amount = models.IntegerField(blank=True, null=True)
    monday_sales_amount = models.FloatField(blank=True, null=True)
    tuesday_sales_amount = models.FloatField(blank=True, null=True)
    wednesday_sales_amount = models.FloatField(blank=True, null=True)
    thursday_sales_amount = models.FloatField(blank=True, null=True)
    friday_sales_amount = models.FloatField(blank=True, null=True)
    saturday_sales_amount = models.FloatField(blank=True, null=True)
    sunday_sales_amount = models.FloatField(blank=True, null=True)
    sales_amount_time_00_06 = models.FloatField(blank=True, null=True)
    sales_amount_time_06_11 = models.FloatField(blank=True, null=True)
    sales_amount_time_11_14 = models.FloatField(blank=True, null=True)
    sales_amount_time_14_17 = models.FloatField(blank=True, null=True)
    sales_amount_time_17_21 = models.FloatField(blank=True, null=True)
    sales_amount_time_21_24 = models.FloatField(blank=True, null=True)
    male_sales_amount = models.FloatField(blank=True, null=True)
    female_sales_amount = models.FloatField(blank=True, null=True)
    sales_amount_age_10 = models.FloatField(blank=True, null=True)
    sales_amount_age_20 = models.FloatField(blank=True, null=True)
    sales_amount_age_30 = models.FloatField(blank=True, null=True)
    sales_amount_age_40 = models.FloatField(blank=True, null=True)
    sales_amount_age_50 = models.FloatField(blank=True, null=True)
    sales_amount_age_60_above = models.FloatField(blank=True, null=True)
    total_stores_count = models.IntegerField(blank=True, null=True)
    ordinary_stores_count = models.IntegerField(blank=True, null=True)
    franchise_stores_count = models.IntegerField(blank=True, null=True)
    opened_stores_count = models.IntegerField(blank=True, null=True)
    closed_stores_count = models.IntegerField(blank=True, null=True)
    opening_rate = models.IntegerField(blank=True, null=True)
    closure_rate = models.IntegerField(blank=True, null=True)
    ordinary_stores_ratio = models.FloatField(blank=True, null=True)
    franchise_stores_ratio = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fo'


class Fx(models.Model):
    new_column = models.CharField(db_column='New_Column', primary_key=True, max_length=45)  # Field name made lowercase.
    reference_year_quarter_code = models.IntegerField(blank=True, null=True)
    commercial_area_code = models.IntegerField(blank=True, null=True)
    total_resident_population = models.FloatField(blank=True, null=True)
    male_resident_population = models.FloatField(blank=True, null=True)
    female_resident_population = models.FloatField(blank=True, null=True)
    resident_population_age_10 = models.FloatField(blank=True, null=True)
    resident_population_age_20 = models.FloatField(blank=True, null=True)
    resident_population_age_30 = models.FloatField(blank=True, null=True)
    resident_population_age_40 = models.FloatField(blank=True, null=True)
    resident_population_age_50 = models.FloatField(blank=True, null=True)
    resident_population_age_60_above = models.FloatField(blank=True, null=True)
    male_age_10_resident_population = models.FloatField(blank=True, null=True)
    male_age_20_resident_population = models.FloatField(blank=True, null=True)
    male_age_30_resident_population = models.FloatField(blank=True, null=True)
    male_age_40_resident_population = models.FloatField(blank=True, null=True)
    male_age_50_resident_population = models.FloatField(blank=True, null=True)
    male_age_60_above_resident_population = models.FloatField(blank=True, null=True)
    female_age_10_resident_population = models.FloatField(blank=True, null=True)
    female_age_20_resident_population = models.FloatField(blank=True, null=True)
    female_age_30_resident_population = models.FloatField(blank=True, null=True)
    female_age_40_resident_population = models.FloatField(blank=True, null=True)
    female_age_50_resident_population = models.FloatField(blank=True, null=True)
    female_age_60_above_resident_population = models.FloatField(blank=True, null=True)
    total_float_population = models.FloatField(blank=True, null=True)
    male_float_population = models.FloatField(blank=True, null=True)
    female_float_population = models.FloatField(blank=True, null=True)
    float_population_age_10 = models.FloatField(blank=True, null=True)
    float_population_age_20 = models.FloatField(blank=True, null=True)
    float_population_age_30 = models.FloatField(blank=True, null=True)
    float_population_age_40 = models.FloatField(blank=True, null=True)
    float_population_age_50 = models.FloatField(blank=True, null=True)
    float_population_age_60_above = models.FloatField(blank=True, null=True)
    float_population_time_00_06 = models.FloatField(blank=True, null=True)
    float_population_time_06_11 = models.FloatField(blank=True, null=True)
    float_population_time_11_14 = models.FloatField(blank=True, null=True)
    float_population_time_14_17 = models.FloatField(blank=True, null=True)
    float_population_time_17_21 = models.FloatField(blank=True, null=True)
    float_population_time_21_24 = models.FloatField(blank=True, null=True)
    float_population_monday = models.FloatField(blank=True, null=True)
    float_population_tuesday = models.FloatField(blank=True, null=True)
    float_population_wednesday = models.FloatField(blank=True, null=True)
    float_population_thursday = models.FloatField(blank=True, null=True)
    float_population_friday = models.FloatField(blank=True, null=True)
    float_population_saturday = models.FloatField(blank=True, null=True)
    float_population_sunday = models.FloatField(blank=True, null=True)
    total_office_population = models.FloatField(blank=True, null=True)
    male_office_population = models.FloatField(blank=True, null=True)
    female_office_population = models.FloatField(blank=True, null=True)
    office_population_age_10 = models.FloatField(blank=True, null=True)
    office_population_age_20 = models.FloatField(blank=True, null=True)
    office_population_age_30 = models.FloatField(blank=True, null=True)
    office_population_age_40 = models.FloatField(blank=True, null=True)
    office_population_age_50 = models.FloatField(blank=True, null=True)
    office_population_age_60_above = models.FloatField(blank=True, null=True)
    male_age_10_office_population = models.FloatField(blank=True, null=True)
    male_age_20_office_population = models.FloatField(blank=True, null=True)
    male_age_30_office_population = models.FloatField(blank=True, null=True)
    male_age_40_office_population = models.FloatField(blank=True, null=True)
    male_age_50_office_population = models.FloatField(blank=True, null=True)
    male_age_60_above_office_population = models.FloatField(blank=True, null=True)
    female_age_10_office_population = models.FloatField(blank=True, null=True)
    female_age_20_office_population = models.FloatField(blank=True, null=True)
    female_age_30_office_population = models.FloatField(blank=True, null=True)
    female_age_40_office_population = models.FloatField(blank=True, null=True)
    female_age_50_office_population = models.FloatField(blank=True, null=True)
    female_age_60_above_office_population = models.FloatField(blank=True, null=True)
    number_of_crowded_facilities = models.IntegerField(blank=True, null=True)
    medical = models.IntegerField(blank=True, null=True)
    education = models.IntegerField(blank=True, null=True)
    commercial = models.IntegerField(blank=True, null=True)
    transportation = models.IntegerField(blank=True, null=True)
    key_money_amount = models.FloatField(blank=True, null=True)
    security_deposit_amount = models.FloatField(blank=True, null=True)
    monthly_rent_amount = models.FloatField(blank=True, null=True)
    area_size = models.FloatField(blank=True, null=True)
    rent_per_pyung = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fx'