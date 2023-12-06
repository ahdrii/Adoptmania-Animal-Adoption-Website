# Copyright 2022 Jacques Berger
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


import sqlite3
import re # import regex

def _build_animal(result_set_item):
    animal = {}
    animal["id"] = result_set_item[0]
    animal["nom"] = result_set_item[1]
    animal["espece"] = result_set_item[2]
    animal["race"] = result_set_item[3]
    animal["age"] = result_set_item[4]
    animal["description"] = result_set_item[5]
    animal["courriel"] = result_set_item[6]
    animal["adresse"] = result_set_item[7]
    animal["ville"] = result_set_item[8]
    animal["cp"] = result_set_item[9]
    return animal

#####################
#   Validations     #
#####################

# CHECK NOM -- Works -- theorically
def validate_name(nom):
    regex_string = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-.'']" # check varchar 25
    if re.fullmatch(regex_string, nom) and  1 <= len(nom) <= 75:
        return True
    return False

# CHECK ESPECE 
def validate_espece(espece):
    regex_string = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']" # check varchar 25
    if re.fullmatch(regex_string, espece) and  1 <= len(espece) <= 25:
        return True
    return False

# CHECK RACE
def validate_race(race):
    regex_string = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']" # check varchar 25
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
    regex_adresse = r"^\d+\s+[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']+$"
    if re.fullmatch(regex_adresse, adresse) and 1<= len(adresse) <= 75: #check varchar 75
        return True
    return False

# CHECK VILLE
def validate_ville(ville):
    ville_regex = r"[a-zA-ZéèêëàâäôöûüçÉÈÊËÀÂÄÔÖÛÜÇ\s-'']"
    if re.fullmatch(ville_regex, ville) and  1 <= len(ville) <= 75:  # check varchar 75
        return True 
    return False

# CHECK CODE POSTAL
def validate_code_postal(cp):
    my_regex = r"^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] [0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$"
    if re.fullmatch(my_regex, cp): # check varchar 7 avec regex
        return True
    return False


class Database:
    def __init__(self):
        self.connection = None

    def get_connection(self):
        if self.connection is None:
            self.connection = sqlite3.connect('db/animaux.db')
        return self.connection

    def disconnect(self):
        if self.connection is not None:
            self.connection.close()

    def get_animaux(self):
        cursor = self.get_connection().cursor()
        query = ("select id, nom, espece, race, age, description, "
                "courriel, adresse, ville, cp from animaux")
        cursor.execute(query)
        all_data = cursor.fetchall()
        return [_build_animal(item) for item in all_data]

    def get_animal(self, animal_id):
        cursor = self.get_connection().cursor()
        query = ("select id, nom, espece, race, age, description, courriel, "
                "adresse, ville, cp from animaux where id = ?")
        cursor.execute(query, (animal_id,))
        item = cursor.fetchone()
        if item is None:
            return item
        else:
            return _build_animal(item)


    # ORIGINAL CODE: 
    # def add_animal(self, nom, espece, race, age, description, courriel,
    #             adresse, ville, cp):
    #     connection = self.get_connection()
    #     query = ("insert into animaux(nom, espece, race, age, description, "
    #             "courriel, adresse, ville, cp) "
    #             "values(?, ?, ?, ?, ?, ?, ?, ?, ?)")
    #     connection.execute(query, (nom, espece, race, age, description,
    #                             courriel, adresse, ville, cp))
    #     cursor = connection.cursor()
    #     cursor.execute("select last_insert_rowid()")
    #     lastId = cursor.fetchone()[0]
    #     connection.commit()
    #     return lastId
    
    # MODIFIED CODE:
    def add_animal(self, nom, espece, race, age, description, courriel,
                adresse, ville, cp):
        if (not validate_name(nom) or not validate_espece(espece) or not validate_race(race) or
            not validate_age(age) or not validate_description(description) or
            not validate_courriel(courriel) or not validate_adresse(adresse) or
            not validate_ville(ville) or not validate_code_postal(cp)):
            return False
        connection = self.get_connection()
        query = ("insert into animaux(nom, espece, race, age, description, "
                "courriel, adresse, ville, cp) "
                "values(?, ?, ?, ?, ?, ?, ?, ?, ?)")
        connection.execute(query, (nom, espece, race, age, description,
                                courriel, adresse, ville, cp))
        cursor = connection.cursor()
        cursor.execute("select last_insert_rowid()")
        lastId = cursor.fetchone()[0]
        connection.commit()
        return lastId