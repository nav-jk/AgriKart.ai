from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('farmer', 'Farmer'),
        ('buyer', 'Buyer'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)


class Farmer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    village = models.CharField(max_length=100)
    registered_via_whatsapp = models.BooleanField(default=True)
    address = models.CharField(max_length=255, default='')

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='client_profile')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=255, default='')

class CollectionPoint(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

class Produce(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('confirmed', 'Confirmed'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered'),
    ]
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    crop_name = models.CharField(max_length=100)
    quantity_kg = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    collection_point = models.ForeignKey(CollectionPoint, on_delete=models.SET_NULL, null=True)

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('delivered', 'Delivered'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
    ]
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE)
    quantity_kg = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    scheduled_time = models.DateTimeField()
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='unpaid')

class Delivery(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('picked', 'Picked'),
        ('delivered', 'Delivered'),
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    driver_name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')

