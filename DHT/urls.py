from django.urls import path
from . import views,api
from .views import HomeView, table, chart_data, IncdData
from django.views.generic import TemplateView



urlpatterns = [
    path('', HomeView.as_view(), name='home-api'),
    path('table', table.as_view(), name='table-api'),
    path('', TemplateView.as_view(template_name='index.html')),
    # path('api/table/', table, name='table'),
    path('incd-data/', IncdData.as_view(), name='incd-data'),
    path("api",api.Dlist,name='json'),
    path("api/post",api.Dlist,name='json'),
    path('download_csv/', views.download_csv, name='download_csv'),
   # path('index/',views.table,name='table'),
    path('myChartTemp/',views.graphiqueTemp,name='myChartTemp'),
    path('myChartHum/',views.graphiqueHum,name='myChartHum'),
    #path('chart-data/', views.chart_data, name='chart-data'),
    path('chart-data/', chart_data.as_view(), name='chart-data'),
    path('chart-data-jour/', views.chart_data_jour, name='chart-data-jour'),
    path('chart-data-semaine/', views.chart_data_semaine, name='chart-data-semaine'),
    path('chart-data-mois/', views.chart_data_mois, name='chart-data-mois'),

]