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
class UserSignupSerializer(serializers.ModelSerializer):
    # Accept role as input during signup
    role = serializers.ChoiceField(
        choices=[('farmer', 'Farmer'), ('buyer', 'Buyer')],
        write_only=True
    )

    # Show role after user creation (read-only)
    role_display = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'role_display']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, role=role)
        return user

    def get_role_display(self, obj):
        # Make sure the userprofile exists
        try:
            return obj.userprofile.role
        except UserProfile.DoesNotExist:
            return None
