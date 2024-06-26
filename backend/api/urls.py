from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ComplaintViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'complaints', ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
