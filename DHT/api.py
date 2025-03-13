from .models import Dht11
from .serializers import DHT11serialize
import rest_framework
from rest_framework.decorators import api_view
from rest_framework import status,generics
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
import requests
from twilio.rest import Client




@api_view(["GET", "POST"])
def Dlist(request):

    if request.method == "GET":
        all_data = Dht11.objects.all()
        data_ser = DHT11serialize(all_data, many=True)  # Les données sont sérialisées en JSON
        return Response(data_ser.data)

    elif request.method == "POST":
        serial = DHT11serialize(data=request.data)

        if serial.is_valid():
            serial.save()
            derniere_temperature = Dht11.objects.last().temp
            print(derniere_temperature)

            if serial.is_valid():
                serial.save()
                derniere_temperature = Dht11.objects.last().temp
                print(derniere_temperature)

                if derniere_temperature > 25:
                    # Gmail
                    subject = 'Alerte MyWeather'
                    message = 'La température dépasse le seuil de 25°C, veuillez intervenir immédiatement pour vérifier et corriger cette situation'
                    email_from = settings.EMAIL_HOST_USER
                    recipient_list = ['malaklakehal510@gmail.com']
                    send_mail(subject, message, email_from, recipient_list)
                    print("mail send")

                    # Définir la fonction pour envoyer des messages Telegram
                    def send_telegram_message(token, chat_id, message):
                        url = f"https://api.telegram.org/bot{token}/sendMessage"
                        payload = {
                            'chat_id': chat_id,
                            'text': message
                        }
                        response = requests.post(url, data=payload)
                        return response

                        # Whatsapp

                    account_sid = 'ACf94519741f410d6d14eb0edb02067439'
                    auth_token = '34203ec1168312ae693453cd9511e2b7'
                    client = Client(account_sid, auth_token)
                    message_whatsapp = client.messages.create(
                        from_='whatsapp:+14155238886',
                        body='La température dépasse le seuil de 8°C, veuillez intervenir immédiatement pour vérifier et corriger cette situation',
                        to='whatsapp:+212682292315'
                    )
                    # Alert Telegram
                    telegram_token = '7601646376:AAGk7OeBnT-Cdxb__YTMOetKKrEi9giRZWM '
                    chat_id = '5999448954'  # Remplacez par votre ID de chat
                    telegram_message = message
                    send_telegram_message(telegram_token, chat_id, telegram_message)

                return Response(serial.data, status=status.HTTP_201_CREATED)

            else:
                return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
