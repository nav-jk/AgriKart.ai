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
        exclude = []  # temporarily allow all fields
        read_only_fields = ['client']  # ensure frontend can't override


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'
from .models import UserProfile, Client

class UserSignupSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(
        choices=[('farmer', 'Farmer'), ('buyer', 'Buyer')],
        write_only=True  # ✅ input only
    )
    address = serializers.CharField(max_length=255, write_only=True)
    role_display = serializers.SerializerMethodField()  # ✅ output

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'address', 'role_display']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')
        address = validated_data.pop('address')
        user = User.objects.create_user(**validated_data)

        # Manually create user profile
        UserProfile.objects.create(user=user, role=role)

        if role == 'buyer':
            Client.objects.create(name=user.username, email=user.email, address=address)
        elif role == 'farmer':
            Farmer.objects.create(name=user.username, phone="0000000000", village="Unknown", registered_via_whatsapp=True, address=address)

        return user

    def get_role_display(self, obj):
        try:
            return obj.userprofile.role
        except:
            return None

