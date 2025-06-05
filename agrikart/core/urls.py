from django.urls import path, include
from .views import redirect_root
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'farmers', FarmerViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'collection-points', CollectionPointViewSet)
router.register(r'produce', ProduceViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'deliveries', DeliveryViewSet)

urlpatterns = [
    path('', include(router.urls)),  # ⚠️ Use '' instead of 'api/'
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('token/', CustomTokenView.as_view(), name='token_obtain_pair'),
]