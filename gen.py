import http.client
import json
import random
from urllib.parse import quote
import re
from gpt_2_simple import gpt_2

# Tu clave de API de Musixmatch
api_key = '4e7833e57aa462ae722883ca76166b7b'

# Función para obtener la letra de una canción
def obtener_letra_cancion(artist, track):
    connection = http.client.HTTPSConnection("api.musixmatch.com")
    artist = quote(artist)
    track = quote(track)
    endpoint = f"/ws/1.1/matcher.lyrics.get?q_artist={artist}&q_track={track}&apikey={api_key}"
    connection.request("GET", endpoint)
    response = connection.getresponse()
    data = response.read().decode('utf-8')
    response_data = json.loads(data)

    if response_data['message']['header']['status_code'] == 200:
        lyrics = response_data['message']['body']['lyrics']['lyrics_body']
        return lyrics
    else:
        return "No se encontró la letra de la canción."

# Función para generar una letra de canción aleatoria con estructura
def generar_letra_aleatoria(lyrics1, lyrics2, num_verses=3, num_lines_per_verse=4, num_choruses=2, num_lines_per_chorus=4):
    words1 = re.findall(r'\b\w+\b', lyrics1)  # Tokeniza las palabras de la primera canción
    words2 = re.findall(r'\b\w+\b', lyrics2)  # Tokeniza las palabras de la segunda canción
    num_words1 = len(words1)
    num_words2 = len(words2)
    
    # Divide la letra en versos y coros
    verses = []
    for _ in range(num_verses):
        verse = []
        for _ in range(num_lines_per_verse):
            # Alternar entre las dos canciones al generar líneas
            if random.random() < 0.5:
                line = " ".join([random.choice(words1) for _ in range(random.randint(8, 15))])
            else:
                line = " ".join([random.choice(words2) for _ in range(random.randint(8, 15))])
            verse.append(line)
        verses.append(verse)
    
    choruses = []
    for _ in range(num_choruses):
        chorus = []
        for _ in range(num_lines_per_chorus):
            # Alternar entre las dos canciones al generar líneas
            if random.random() < 0.5:
                line = " ".join([random.choice(words1) for _ in range(random.randint(8, 15))])
            else:
                line = " ".join([random.choice(words2) for _ in range(random.randint(8, 15))])
            chorus.append(line)
        choruses.append(chorus)
    
    return {
        "verses": verses,
        "choruses": choruses
    }

# Solicitar al usuario el nombre del artista y la canción para ambas canciones
artist1 = input("Ingresa el nombre del artista de la primera canción: ")
track1 = input("Ingresa el nombre de la primera canción: ")
artist2 = input("Ingresa el nombre del artista de la segunda canción: ")
track2 = input("Ingresa el nombre de la segunda canción: ")

# Obtener la letra de ambas canciones
letra_original1 = obtener_letra_cancion(artist1, track1)
letra_original2 = obtener_letra_cancion(artist2, track2)

if letra_original1 != "No se encontró la letra de la canción." and letra_original2 != "No se encontró la letra de la canción.":
    print("Letra original de la primera canción:")
    print(letra_original1)
    print("\nLetra original de la segunda canción:")
    print(letra_original2)
    
    # Generar una pregunta para GPT-2
    pregunta = f"Genera una letra de canción que combine '{track1}' de {artist1} con '{track2}' de {artist2}."

    # Generar respuesta coherente con GPT-2
    respuesta_gpt2 = gpt_2.generate(sess=gpt_2.start_tf_sess(), run_name='run1', prefix=pregunta, length=150, temperature=0.7, return_as_list=True)[0]
    print("\nRespuesta de GPT-2:")
    print(respuesta_gpt2)

    # Incorporar la respuesta de GPT-2 a la letra generada
    cancion_generada = generar_letra_aleatoria(letra_original1, letra_original2)
    cancion_generada["verses"].insert(0, [respuesta_gpt2])

    print("\nLetra generada con incorporación de GPT-2:")
    for i, verse in enumerate(cancion_generada["verses"]):
        print(f"Verso {i + 1}:")
        for line in verse:
            print(line)
    
    for i, chorus in enumerate(cancion_generada["choruses"]):
        print(f"Coro {i + 1}:")
        for line in chorus:
            print(line)
else:
    print("No se encontró la letra de una de las canciones.")
