from .models import Dht11  # Assurez-vous d'importer le modèle Dht11
from django.utils import timezone
import csv
from django.http import HttpResponse
from django.http import JsonResponse
import datetime
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from rest_framework.views import APIView
from rest_framework.response import Response


class HomeView(APIView):
    def get(self, request):

        return Response({"message": "Welcome to the API!"})

class IncdData(APIView):
    def get(self, request):
        dh = Dht11.objects.all()

        valeurs = [
            {
                'date': record.dt,
                'id': record.id,
                'temp': record.temp,
                'hum': record.hum,
            }
            for record in dh
        ]

        return Response({'valeurs': valeurs})

class table(APIView):
    def get(self, request):
        derniere_ligne = Dht11.objects.last()

        if derniere_ligne is None:
            return Response({'valeurs': None}, status=200)

        derniere_date = derniere_ligne.dt
        delta_temps = timezone.now() - derniere_date
        difference_minutes = delta_temps.total_seconds() // 60

        if difference_minutes < 60:
            temps_ecoule = f'il y a {int(difference_minutes)} min'
        else:
            heures = int(difference_minutes // 60)
            minutes = int(difference_minutes % 60)
            temps_ecoule = f'il y a {heures}h {minutes}min'

        valeurs = {
            'date': temps_ecoule,
            'id': derniere_ligne.id,
            'temp': derniere_ligne.temp,
            'hum': derniere_ligne.hum,
        }
        return Response({"valeurs": valeurs})


def download_csv(request):
    model_values = Dht11.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="dht.csv"'
    writer = csv.writer(response)
    writer.writerow(['id', 'temp', 'hum', 'dt'])
    liste = model_values.values_list('id', 'temp', 'hum', 'dt')
    for row in liste:
        writer.writerow(row)
    return response
#pour afficher navbar de template

#pour afficher les graphes
def graphiqueTemp(request):
    return render(request, 'ChartTemp.html')
# récupérer toutes les valeur de température et humidity sous forme un #fichier json
def graphiqueHum(request):
    return render(request, 'ChartHum.html')
# récupérer toutes les valeur de température et humidity sous forme un #fichier json
class chart_data(APIView):
    def get(self, request):
        dht = Dht11.objects.all()

        data = {
            'temps': [Dt.dt for Dt in dht],
            'temperature': [Temp.temp for Temp in dht],
            'humidity': [Hum.hum for Hum in dht]
        }
        return Response(data)

#pour récupérer les valeurs de température et humidité de dernier 24h
# et envoie sous forme JSON
def chart_data_jour(request):
    dht = Dht11.objects.all()
    now = timezone.now()

    # Récupérer l'heure il y a 24 heures
    last_24_hours = now - timezone.timedelta(hours=24)

    # Récupérer tous les objets de Module créés au cours des 24 dernières heures
    dht = Dht11.objects.filter(dt__range=(last_24_hours, now))
    data = {
        'temps': [Dt.dt for Dt in dht],
        'temperature': [Temp.temp for Temp in dht],
        'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)

#pour récupérer les valeurs de température et humidité de dernier semaine
# et envoie sous forme JSON
def chart_data_semaine(request):
    dht = Dht11.objects.all()
    # calcul de la date de début de la semaine dernière
    date_debut_semaine = timezone.now().date() - datetime.timedelta(days=7)
    print(datetime.timedelta(days=7))
    print(date_debut_semaine)

    # filtrer les enregistrements créés depuis le début de la semaine dernière
    dht = Dht11.objects.filter(dt__gte=date_debut_semaine)

    data = {
        'temps': [Dt.dt for Dt in dht],
        'temperature': [Temp.temp for Temp in dht],
        'humidity': [Hum.hum for Hum in dht]
    }

    return JsonResponse(data)

#pour récupérer les valeurs de température et humidité de dernier moins
# et envoie sous forme JSON
def chart_data_mois(request):
    dht = Dht11.objects.all()

    date_debut_semaine = timezone.now().date() - datetime.timedelta(days=30)
    print(datetime.timedelta(days=30))
    print(date_debut_semaine)

    # filtrer les enregistrements créés depuis le début de la semaine dernière
    dht = Dht11.objects.filter(dt__gte=date_debut_semaine)

    data = {
        'temps': [Dt.dt for Dt in dht],
        'temperature': [Temp.temp for Temp in dht],
        'humidity': [Hum.hum for Hum in dht]
    }
    return JsonResponse(data)



def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
