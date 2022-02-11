from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    def create_user(self, **kwargs):
        if not kwargs.get('email'):
            raise ValueError('User must be needed a email address.')
        if not kwargs.get('password'):
            raise ValueError('User must be needed a password for security issue.')

        user_obj = self.model(
            email=self.normalize_email(kwargs.pop('email'))
        )

        user_obj.set_password(kwargs.pop('password'))

        for k, v in kwargs.items():
            setattr(user_obj, k, v)

        user_obj.save(using=self._db)

        return user_obj

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email=email,
            password=password,
            admin=True,
            **kwargs
        )
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)  # core for our custom user
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)

    gender = models.CharField(max_length=1, choices=(
        ('m', 'Male'),
        ('f', 'Female'),
        ('o', 'Other')
    ))

    phone = models.CharField(max_length=15, null=True)
    admin = models.BooleanField(default=False)
    status = models.BooleanField(default=True)  # can login

    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'  # username

    # USERNAME_FIELD and email are required by default
    REQUIRED_FIELDS = []  # ['full_name', 'email']

    class Meta:
        ordering = ['-update_date', '-create_date']
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email

    def get_user(self):
        return self.email

    def full_name(self):
        return "%s %s" % (self.first_name, self.last_name)

    def short_name(self):
        if self.first_name:
            return self.first_name
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    @property
    def status_text(self):
        return ['Inactive', 'Active'][self.status]

    @property
    def is_active(self):
        return self.status

    @property
    def is_admin(self):
        return self.admin


class Product(models.Model):
    code = models.CharField(max_length=12)
    name = models.CharField(max_length=72)
    type = models.IntegerField(choices=(
        (1, 'plain'),
        (2, 'meter')
    ))
    availability = models.BooleanField(default=True)
    needing_repair = models.BooleanField(default=False)
    durability = models.IntegerField()
    max_durability = models.IntegerField()
    mileage = models.IntegerField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_rent_period = models.IntegerField()
    status = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    @property
    def status_text(self):
        return ['Inactive', 'Active'][self.status]

    @property
    def is_active(self):
        return self.status


class ProductBooking(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)
    actual_cost = models.DecimalField(max_digits=10, decimal_places=2)
    returned = models.BooleanField(default=False)

    def __str__(self):
        return "{}: {}-{}".format(
            self.product, 
            self.from_date, 
            self.to_date
        )
