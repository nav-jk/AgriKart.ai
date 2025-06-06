from rest_framework import viewsets
from .models import Farmer, Client, CollectionPoint, Produce, Order, Delivery, UserProfile
from .serializers import *\

from django.http import HttpResponseRedirect
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSignupSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Order, Client
from .serializers import OrderSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Client, Produce, Farmer, CollectionPoint
from django.utils.timezone import now



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


@api_view(['POST'])
def seed_data(request):
    # Optional: clear previous test data
    Client.objects.filter(name__startswith="Test").delete()
    Produce.objects.filter(crop_name__startswith="Test").delete()
    Farmer.objects.filter(name__startswith="SeedFarmer").delete()
    CollectionPoint.objects.filter(name__startswith="SeedPoint").delete()

    # Create dummy farmer + collection point (needed for FK)
    farmer = Farmer.objects.create(name="SeedFarmer", phone="1234567890", village="TestVille", registered_via_whatsapp=True)
    collection_point = CollectionPoint.objects.create(name="SeedPoint", location="11.11,22.22")

    # Create test produce
    crops = ["Tomato", "Cabbage", "Carrot", "Potato"]
    for i, crop in enumerate(crops):
        Produce.objects.create(
            farmer=farmer,
            crop_name=f"Test {crop}",
            quantity_kg=50 + i * 10,
            status="available",
            collection_point=collection_point
        )

    # Create test buyer (client)
    Client.objects.create(name="TestBuyer", email="buyer@example.com", address="123 Market St")

    return Response({"message": "Seed data added successfully ✅"})



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()  # ✅ Add this line
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        client = Client.objects.filter(user=user).first()
        return Order.objects.filter(client=client)

    def perform_create(self, serializer):
        client = Client.objects.get(user=self.request.user)
        serializer.save(client=client)
