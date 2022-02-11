from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import *
# Register your models here.

admin.site.unregister(Group)


class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'code', 'name', 'type', 'availability',
        'needing_repair', 'price', 'status'
    )
    list_filter = (
        'availability', 'needing_repair', 'status'
    )
    search_fields  = ('code', 'name')

admin.site.register(Product, ProductAdmin)


class ProductBookingAdmin(admin.ModelAdmin):
    list_display = (
        'product', 'from_date', 'to_date', 'estimated_cost',
        'actual_cost', 'returned'
    )
    list_filter = (
        'from_date', 'to_date', 'returned'
    )
    search_fields  = ('product',)

admin.site.register(ProductBooking, ProductBookingAdmin)


class UserAdmin(BaseUserAdmin):
    list_display = (
        'email', 'first_name', 'last_name', 'status', 'admin'
    )
    list_filter = (
        'status', 'admin'
    )
    search_fields  = (
        'email', 'first_name', 'last_name'
    )
    readonly_fields = ('email',)

    fieldsets = (
        (None, {
            'fields': (
                'email', 'first_name', 'last_name'
            )
        }),
        ('Permissions', {
            'fields': ('admin', 'status')
        }),
    )
    add_fieldsets = (
        (None, {
            'fields': (
                'email', 'password1', 'password2', 
                'first_name', 'last_name'
            )
        }),
        ('Other info', {
            'fields': (
                'template_name'
            )
        }),
        ('Permissions', {
            'fields': ('admin', 'status')
        }),
    )
    ordering = ('email',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
