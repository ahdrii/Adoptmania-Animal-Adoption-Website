create table animaux (
  id integer primary key,
  nom varchar(25),
  espece varchar(25),
  race varchar(25),
  age integer,
  description varchar(500),
  courriel varchar(80),
  adresse varchar(75),
  ville varchar(75),
  cp varchar(7)
);

insert into animaux values (1, 'Fluffy', 'Mouton', 'Dorper', 2, 'Mouton Dorpor plutôt jeune. Pas pour l''élevage, car provient d''une famille végane.', 'mouton@noteleveur.ca', '47 rang du Nord', 'Victoriaville', 'H3E 3K4');
insert into animaux values (2, 'Dragon', 'Chien', 'Chihuahua', 5, 'Petit chien docile.', 'steve@hotmail.com', '255 chemin du Loup', 'Drummondville', 'J3R 4I3');
insert into animaux values (3, 'Perdita', 'Chien', 'Dalmatien', 12, 'Mère de plusieurs portées. Recherche une famille calme pour sa retraite.', 'cruella@disney.com', '34 rue de LaSalle', 'Montréal', 'H3E 4R5');
insert into animaux values (4, 'Skippy', 'Kangourou', 'Inconnu', 7, 'Ancien acteur d''une série télé.', 'kangourou@animalcrossing.com', '4848 de la chance', 'St-Hilaire', 'J4P 9U4');
insert into animaux values (5, 'Madame Long Cou', 'Escargot', 'Inconnu', 1, 'Escargot de jardin ayant eu une belle vie.', 'snail@snailmail.com', '33 de la Noix', 'Montréal', 'H3R 3J4');
insert into animaux values (6, 'Serpent Haut', 'Serpent', 'Boa', 3, 'Serpent boa retrouvé au pavillon SH de l''UQAM.', 'serpent@uqam.ca', 'CP8888 Succ Centre-ville', 'Montréal', 'H3B 3C3');
insert into animaux values (7, 'Mojo', 'Chien', 'Pug', 8, 'Vieux chien bien calme qui aime les promenades au parc.', 'cedric@hotmail.com', '4744 Marquette', 'Contrecoeur', 'J0L 1C0');

