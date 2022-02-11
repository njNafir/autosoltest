from .views import *
from rest_framework import routers
from django.urls import re_path


urlpatterns = [
    re_path(r'^meta-info/$', blog_meta_info, name='meta_info'),

    re_path(r'^signup', RegisterView.as_view(), name='api_signup'),
    re_path(r'^login', LoginAPIView.as_view(), name='api_login'),
    re_path(r'^update-my-profile/', user_profile_update, name='user_profile_update'),
    re_path(r'^logout', LogoutAPIView.as_view(), name='api_logout'),

    re_path(r'^email-verify', VerifyEmail.as_view(), name='email-verify'),

    re_path(r'^request-password-reset', RequestPasswordResetEmail.as_view(), name='request-password-reset'),
    re_path(r'^password-token-check', PasswordTokenCheckAPI.as_view(), name='password-token-check'),
    re_path(r'^set-new-password', SetNewPasswordAPIView.as_view(), name='set-new-password'),
]

