# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class BookingsBooking(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    kind = models.CharField(max_length=15)
    check_in = models.DateField(blank=True, null=True)
    check_out = models.DateField(blank=True, null=True)
    experience_time = models.DateTimeField(blank=True, null=True)
    guests = models.PositiveIntegerField()
    experience = models.ForeignKey('ExperiencesExperience', models.DO_NOTHING, blank=True, null=True)
    room = models.ForeignKey('RoomsRoom', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'bookings_booking'


class BulletinboardFile(models.Model):
    id = models.BigAutoField(primary_key=True)
    file = models.CharField(max_length=100)
    post = models.ForeignKey('BulletinboardPost', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'bulletinboard_file'


class BulletinboardPost(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField()
    file = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bulletinboard_post'


class CategoriesCategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    name = models.CharField(max_length=50)
    kind = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'categories_category'


class DirectMessagesChattingroom(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'direct_messages_chattingroom'


class DirectMessagesChattingroomUsers(models.Model):
    id = models.BigAutoField(primary_key=True)
    chattingroom = models.ForeignKey(DirectMessagesChattingroom, models.DO_NOTHING)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'direct_messages_chattingroom_users'
        unique_together = (('chattingroom', 'user'),)


class DirectMessagesMessage(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    text = models.TextField()
    room = models.ForeignKey(DirectMessagesChattingroom, models.DO_NOTHING)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'direct_messages_message'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class ExperiencesExperience(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=80)
    name = models.CharField(max_length=250)
    price = models.PositiveIntegerField()
    address = models.CharField(max_length=250)
    start = models.TimeField()
    end = models.TimeField()
    descrtptions = models.TextField()
    category = models.ForeignKey(CategoriesCategory, models.DO_NOTHING, blank=True, null=True)
    host = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'experiences_experience'


class ExperiencesExperiencePerks(models.Model):
    id = models.BigAutoField(primary_key=True)
    experience = models.ForeignKey(ExperiencesExperience, models.DO_NOTHING)
    perk = models.ForeignKey('ExperiencesPerk', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'experiences_experience_perks'
        unique_together = (('experience', 'perk'),)


class ExperiencesPerk(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=250, blank=True, null=True)
    explanation = models.TextField()

    class Meta:
        managed = False
        db_table = 'experiences_perk'


class M(models.Model):
    myunknowncolumn = models.IntegerField(db_column='MyUnknownColumn', blank=True, null=True)  # Field name made lowercase.
    new_column = models.TextField(db_column='New_Column', blank=True, null=True)  # Field name made lowercase.
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
        db_table = 'm'


class MediasPhoto(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    file = models.CharField(max_length=200)
    description = models.CharField(max_length=140)
    experience = models.ForeignKey(ExperiencesExperience, models.DO_NOTHING, blank=True, null=True)
    room = models.ForeignKey('RoomsRoom', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medias_photo'


class MediasVideo(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    file = models.CharField(max_length=200)
    experience = models.OneToOneField(ExperiencesExperience, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'medias_video'


class MergedDf3(models.Model):
    new_column = models.TextField(db_column='New_Column', blank=True, null=True)  # Field name made lowercase.
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
        db_table = 'merged_df (3)'


class ReviewsReview(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    payload = models.TextField()
    rating = models.PositiveIntegerField()
    experiences = models.ForeignKey(ExperiencesExperience, models.DO_NOTHING, blank=True, null=True)
    room = models.ForeignKey('RoomsRoom', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'reviews_review'


class RoomsAmenity(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'rooms_amenity'


class RoomsRoom(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    name = models.CharField(max_length=180)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=80)
    price = models.PositiveIntegerField()
    rooms = models.PositiveIntegerField()
    toilets = models.PositiveIntegerField()
    description = models.TextField()
    address = models.CharField(max_length=250)
    pet_friendly = models.IntegerField()
    kind = models.CharField(max_length=20)
    category = models.ForeignKey(CategoriesCategory, models.DO_NOTHING, blank=True, null=True)
    owner = models.ForeignKey('UsersUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'rooms_room'


class RoomsRoomAmenities(models.Model):
    id = models.BigAutoField(primary_key=True)
    room = models.ForeignKey(RoomsRoom, models.DO_NOTHING)
    amenity = models.ForeignKey(RoomsAmenity, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'rooms_room_amenities'
        unique_together = (('room', 'amenity'),)


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
    new_column = models.TextField(db_column='New_Column', blank=True, null=True)  # Field name made lowercase.
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


class Swot2(models.Model):
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
        db_table = 'swot2'


class UsersUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=150)
    email = models.CharField(max_length=254)
    password = models.CharField(max_length=128)
    avatar = models.CharField(max_length=200)
    name = models.CharField(max_length=150)
    thred_id = models.CharField(max_length=100, blank=True, null=True)
    is_superuser = models.IntegerField()
    date_joined = models.DateTimeField()
    is_staff = models.IntegerField()
    gender = models.CharField(max_length=10)
    last_login = models.DateTimeField(blank=True, null=True)
    is_host = models.IntegerField()
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    is_active = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users_user'


class UsersUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_user_groups'
        unique_together = (('user', 'group'),)


class UsersUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(UsersUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users_user_user_permissions'
        unique_together = (('user', 'permission'),)


class WishlistsWishlist(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    name = models.CharField(max_length=150)
    user = models.ForeignKey(UsersUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'wishlists_wishlist'


class WishlistsWishlistExperiences(models.Model):
    id = models.BigAutoField(primary_key=True)
    wishlist = models.ForeignKey(WishlistsWishlist, models.DO_NOTHING)
    experience = models.ForeignKey(ExperiencesExperience, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'wishlists_wishlist_experiences'
        unique_together = (('wishlist', 'experience'),)


class WishlistsWishlistRooms(models.Model):
    id = models.BigAutoField(primary_key=True)
    wishlist = models.ForeignKey(WishlistsWishlist, models.DO_NOTHING)
    room = models.ForeignKey(RoomsRoom, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'wishlists_wishlist_rooms'
        unique_together = (('wishlist', 'room'),)
