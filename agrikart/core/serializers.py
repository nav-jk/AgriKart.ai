from rest_framework import serializers
from .models import Farmer, Client, CollectionPoint, Produce, Order, Delivery
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile  



class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class CollectionPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionPoint
        fields = '__all__'

class ProduceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produce
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'
from .models import UserProfile, Client

class UserSignupSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('farmer', 'Farmer'), ('buyer', 'Buyer')], write_only=True)
    role_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'role_display']
        extra_kwargs = {'password': {'write_only': True}}

    def get_role_display(self, obj):
        return obj.userprofile.role if hasattr(obj, 'userprofile') else None

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, role=role)

        if role == "buyer":
            Client.objects.create(name=user.username, email=user.email, address="")

        return user

