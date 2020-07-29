from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(_('email address'), unique=True)
  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  date_joined = models.DateTimeField(default=timezone.now)
  location = models.CharField(max_length=30, default=False)

  USERNAME_FIELD = 'email' # defines the unique identifier for the User model -- to email
  REQUIRED_FIELDS = []

  objects = CustomUserManager() # Specified that all objects for the class come from the CustomUserManager

  def __str__(self):
      return self.email