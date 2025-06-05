from rest_framework import viewsets
from .models import Farmer, Client, CollectionPoint, Produce, Order, Delivery, UserProfile
from .serializers import *\

from django.http import HttpResponseRedirect
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSignupSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



def redirect_root(request):
    return HttpResponseRedirect('/api/')


class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class CollectionPointViewSet(viewsets.ModelViewSet):
    queryset = CollectionPoint.objects.all()
    serializer_class = CollectionPointSerializer

class ProduceViewSet(viewsets.ModelViewSet):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
    
class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer


class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        profile = UserProfile.objects.get(user=self.user)
        data['role'] = profile.role
        return data

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
