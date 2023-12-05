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

@app.route('/search')
def search():
    query = request.args.get('query', '')
    results = [animal for animal in animals if query.lower() in animal['name'].lower()]
    return render_template('search_results.html', query=query, results=results)

@app.route('/')
def home():
    # À remplacer par le contenu de votre choix.
    return render_template('home.html')

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submit-form', methods=['POST'])
def donnees_formulaire():
    nom = request.form['nom']
    espece = request.form['espece']
    race = request.form['race']
    age = request.form['age']
    description = request.form['description']
    courriel = request.form['courriel']
    adresse = request.form['adresse']
    ville = request.form['ville']
    cp = request.form['cp']

    db = Database() 
    animal_id = db.add_animal(nom, espece, race, age, description, courriel, adresse, ville, cp)

    return redirect(url_for('animal_added', animal_id=animal_id))

@app.route('/animal/<int:animal_id>')
def animal_added(animal_id):
    db = get_db()
    animal = db.get_animal(animal_id)

    if animal is not None:
        return render_template('animal_added.html', animal=animal)
    else:
        return render_template('404.html'), 404
    
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()

