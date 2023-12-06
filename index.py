# Copyright 2023 <Votre nom et code permanent>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template
from flask import g
from .database import Database
from flask import redirect
from flask import request
from flask import url_for
import re # import regex

app = Flask(__name__, static_url_path="", static_folder="static")

@app.errorhandler(404)
def page_not_found(error):
    # print(error)
    return render_template("404.html"), 404

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database

# @app.route('/search')
# def search():
#     query = request.args.get('query', '')
#     results = [animal for animal in animals if query.lower() in animal['name'].lower()]
#     return render_template('search_results.html', query=query, results=results)

@app.route('/')
def home():
    # À remplacer par le contenu de votre choix.
    return render_template('home.html')

@app.route('/form')
def form():
    return render_template('form.html')

# Route pour soumettre le formulaire
@app.route("/submit", methods=["GET", "POST"])
def submit():
    if request.method == "GET":
        # Si la méthode est GET, affiche le formulaire
        return render_template("formulaire.html")
    else:
        # Si la méthode est POST, récupère les données du formulaire
        nom = request.form["nom"]
        espece = request.form["espece"]
        race = request.form["race"]
        age = request.form["age"]
        description = request.form["description"]
        courriel = request.form["courriel"]
        adresse = request.form["adresse"]
        ville = request.form["ville"]
        cp = request.form["cp"]

        # Vérifier 
        if (not validate_name(nom) or not validate_espece(espece) or not validate_race(race) or
            not validate_age(age) or not validate_description(description) or
            not validate_courriel(courriel) or not validate_adresse(adresse) or
            not validate_ville(ville) or not validate_code_postal(cp)):
            return render_template("formulaire.html", error="Erreur dans le formulaire")
        else:
            # Si les champs sont valide, ajouter l'animal à la base de données <----------------- TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            db = Database()
            animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)

            # Redirige vers la page de liste <------------------------------------DEBUG POUR VERIFIER QUE LES VALIDATIONS MARCHENT!!!!!!!!
            return redirect(url_for('home')), 301

#####################
#   OLD CODE        #
#####################


# @app.route('/submit-form', methods=['POST'])
# def donnees_formulaire():
#     nom = request.form['nom']
#     espece = request.form['espece']
#     race = request.form['race']
#     age = request.form['age']
#     description = request.form['description']
#     courriel = request.form['courriel']
#     adresse = request.form['adresse']
#     ville = request.form['ville']
#     cp = request.form['cp']

#     db = Database() 
#     animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)

#     return redirect(url_for('animal_added', animal_id=animal_id))


# @app.route('/animal/<int:animal_id>')
# def animal_added(animal_id):
#     db = get_db()
#     animal = db.get_animal(animal_id)

#     if animal is not None:
#         return render_template('animal_added.html', animal=animal)
#     else:
#         return render_template('404.html'), 404

#######################################################################################################################

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()

#####################
#   Validations     #
#####################

# CHECK NOM -- Works -- theorically
def validate_name(nom):
    regex_string = r'^[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s\.-]+$' # check varchar 25
    if re.fullmatch(regex_string, nom) and  1 <= len(nom) <= 75:
        return True
    return False

# CHECK ESPECE 
def validate_espece(espece):
    regex_string = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s''-]+" # check varchar 25
    if re.fullmatch(regex_string, espece) and  1 <= len(espece) <= 25:
        return True
    return False

# CHECK RACE
def validate_race(race):
    regex_string = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s''-]+" # check varchar 25
    if re.fullmatch(regex_string, race) and  1 <= len(race) <= 25:
        return True
    return False

# CHECK AGE
def validate_age(age):
    if age.isdigit() and int(age) >= 0 and int(age) <= 30: #check integer between 0 and 30
        return True
    return False

# CHECK DESCRIPTION
def validate_description(description):
    if len(description) < 1 or len(description) > 500:  #check varchar 500 and if empty
        return False
    elif description.strip() == "":
        return False
    return True

# CHECK COURRIEL
def validate_courriel(courriel):
    regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    if re.fullmatch(regex, courriel) and 1 <= len(courriel) <= 80: #check varchar 80
        return True
    return False

# CHECK ADRESSE
def validate_adresse(adresse):
    regex_adresse = r'^[a-zA-Z0-9éèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s\.\'-]+$'
    if re.fullmatch(regex_adresse, adresse) and 1<= len(adresse) <= 75: #check varchar 75
        return True
    return False

# CHECK VILLE
def validate_ville(ville):
    ville_regex = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s''-]+"
    if re.fullmatch(ville_regex, ville) and  1 <= len(ville) <= 75:  # check varchar 75
        return True 
    return False

# CHECK CODE POSTAL
def validate_code_postal(cp):
    my_regex = r"^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] [0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$"
    if re.fullmatch(my_regex, cp): # check varchar 7 avec regex
        return True
    return False