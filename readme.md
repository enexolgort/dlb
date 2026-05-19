# DLB — Documentation du langage

DLB est un langage de script interprété, impératif, à base de lignes. Chaque ligne est une instruction. Le programme est exécuté ligne par ligne, avec un pointeur de ligne (`lineIndex`) qui peut être modifié par des sauts.

---

## Table des matières

1. [Types de valeurs](#1-types-de-valeurs)
2. [Variables](#2-variables)
3. [Expressions](#3-expressions)
4. [Opérateurs arithmétiques](#4-opérateurs-arithmétiques)
5. [Opérateurs de comparaison](#5-opérateurs-de-comparaison)
6. [Opérateurs booléens](#6-opérateurs-booléens)
7. [Listes](#7-listes)
8. [Affichage](#8-affichage)
9. [Sauts et labels](#9-sauts-et-labels)
10. [Conditions](#10-conditions)
11. [Boucles](#11-boucles)
12. [Fonctions utilitaires](#12-fonctions-utilitaires)
13. [Exemples complets](#13-exemples-complets)
14. [Référence des mots-clés](#14-référence-des-mots-clés)

---

## 1. Types de valeurs

DLB supporte quatre types de valeurs :

| Type      | Exemple                  | Description                        |
|-----------|--------------------------|------------------------------------|
| `number`  | `42`, `3.14`, `-7`       | Entier ou flottant                 |
| `boolean` | `true`, `false`          | Valeur booléenne                   |
| `string`  | `'bonjour'`, `"monde"`   | Chaîne de caractères (guillemets simples ou doubles) |
| `list`    | `[1, 'deux', true]`      | Liste de valeurs (types mixtes)    |

---

## 2. Variables

### Déclaration / Assignation

```
jai nom = expression;
```

`jai` déclare ou réassigne une variable. Si la variable existe déjà, sa valeur est écrasée.

```
jai x = 5;
jai message = 'bonjour';
jai actif = true;
jai x = x ajoute 1;
```

> Il n'y a pas de distinction entre déclaration et assignation — `jai` fait les deux.

---

## 3. Expressions

Les expressions peuvent contenir :
- Des littéraux (`42`, `'texte'`, `true`, `false`)
- Des variables (`x`, `compteur`)
- Des opérateurs (`ajoute`, `egale`, `et`, etc.)
- Des parenthèses pour grouper : `(a ajoute b) multipli c`
- Des fonctions unaires : `taille liste`, `car 65`, `premier liste`, `dernier liste`
- De l'indexation : `liste de 0`

Les expressions respectent la **précédence des opérateurs** (voir sections suivantes).

---

## 4. Opérateurs arithmétiques

| Mot-clé    | Symbole | Description         | Exemple                  | Résultat |
|------------|---------|---------------------|--------------------------|----------|
| `ajoute`   | `+`     | Addition            | `3 ajoute 4`             | `7`      |
| `enleve`   | `-`     | Soustraction        | `10 enleve 3`            | `7`      |
| `multipli` | `*`     | Multiplication      | `3 multipli 4`           | `12`     |
| `divise`   | `/`     | Division            | `10 divise 4`            | `2.5`    |
| `modulo`   | `%`     | Modulo              | `10 modulo 3`            | `1`      |

```
jai resultat = 2 ajoute 3 multipli 4;
```
> `multipli` est prioritaire sur `ajoute` — résultat : `14` (pas `20`).

```
jai resultat = (2 ajoute 3) multipli 4;
```
> Avec parenthèses — résultat : `20`.

---

## 5. Opérateurs de comparaison

Retournent `true` ou `false`.

| Mot-clé        | Symbole | Description              | Exemple               | Résultat |
|----------------|---------|--------------------------|-----------------------|----------|
| `egale`        | `=`     | Égalité                  | `5 egale 5`           | `true`   |
| `different`    | `!=`    | Inégalité                | `5 different 3`       | `true`   |
| `plugran`      | `>`     | Strictement supérieur    | `5 plugran 3`         | `true`   |
| `plupti`       | `<`     | Strictement inférieur    | `3 plupti 5`          | `true`   |
| `preskplugran` | `>=`    | Supérieur ou égal        | `5 preskplugran 5`    | `true`   |
| `preskplupti`  | `<=`    | Inférieur ou égal        | `3 preskplupti 5`     | `true`   |

```
jai estAdulte = age preskplugran 18;
```

---

## 6. Opérateurs booléens

| Mot-clé | Symbole | Description    | Exemple               | Résultat |
|---------|---------|----------------|-----------------------|----------|
| `et`    | `AND`   | ET logique     | `true et false`       | `false`  |
| `ou`    | `OR`    | OU logique     | `true ou false`       | `true`   |
| `non`   | `NOT`   | NON logique    | `non false`           | `true`   |

```
verifi age preskplugran 18 et permis egale true va conduire;
```

### Précédence des opérateurs (du plus faible au plus fort)

```
ou  <  et  <  comparaisons  <  ajoute/enleve  <  multipli/divise/modulo  <  non/taille/car/premier/dernier  <  de
```

---

## 7. Listes

### Déclaration

```
jai liste = [1, 'deux', true, 3.14];
```

Les listes peuvent contenir des types mixtes, y compris d'autres listes (listes imbriquées).

```
jai matrice = [[1, 2], [3, 4], [5, 6]];
```

### Accès par index (`de`)

Les index commencent à `0`.

```
jai premier_element = liste de 0;
jai troisieme = liste de 2;
```

L'index peut être une expression :

```
jai element = liste de (i ajoute 1);
```

### Modification par index

```
jai liste de 0 = 99;
jai liste de i = liste de i ajoute 1;
```

### Ajouter un élément

```
pousse valeur dans liste;
```
Ajoute `valeur` à la **fin** de la liste.

```
tire valeur dans liste;
```
Ajoute `valeur` au **début** de la liste.

### Fonctions de liste

| Fonction        | Description                        | Exemple                  | Résultat |
|-----------------|------------------------------------|--------------------------|----------|
| `taille liste`  | Nombre d'éléments                  | `taille [1,2,3]`         | `3`      |
| `premier liste` | Premier élément                    | `premier [10, 20, 30]`   | `10`     |
| `dernier liste` | Dernier élément                    | `dernier [10, 20, 30]`   | `30`     |

```
jai liste = [10, 20, 30];
affich taille liste;    ← 3
affich premier liste;   ← 10
affich dernier liste;   ← 30
pousse 40 dans liste;
affich dernier liste;   ← 40
```

---

## 8. Affichage

```
affich expression;
```

Affiche la valeur de l'expression dans la console.

```
affich 'bonjour';
affich 42;
affich x ajoute 1;
affich liste;
affich car 65;
```

### Afficher un caractère ASCII

```
affich car 65;    ← A
affich car 97;    ← a
affich car 10;    ← saut de ligne
```

`car` convertit un nombre en son caractère ASCII correspondant.

---

## 9. Sauts et labels

### Labels

Un label marque une ligne comme destination de saut. Il doit être sur sa propre ligne et commencer par `#`.

```
#nom_du_label
```

Les noms de labels peuvent contenir des lettres, chiffres et underscores.

```
#debut
#fin_boucle
#test_ok
```

### Saut inconditionnel

```
va label;
```

Déplace l'exécution vers le label spécifié.

```
va fin;
affich 'jamais affiché';
#fin
affich 'exécuté';
```

`va` accepte aussi une expression numérique pour sauter à un numéro de ligne :

```
va 0;       ← retour à la ligne 0
va ip;      ← saute à la ligne dont le numéro est dans ip
```

---

## 10. Conditions

```
verifi condition va label;
```

Si `condition` est vraie, saute au `label`. Sinon, passe à la ligne suivante.

```
jai x = 5;
verifi x plugran 3 va grand;
affich 'petit';
va suite;
#grand
affich 'grand';
#suite
```

### If / Else

DLB n'a pas de `si/sinon` natif, mais on peut l'émuler avec `verifi` et des labels :

```
verifi condition va si_vrai;
affich 'faux';
va fin_si;
#si_vrai
affich 'vrai';
#fin_si
```

---

## 11. Boucles

DLB n'a pas de structure de boucle native. Les boucles s'écrivent avec `verifi` + `va`.

### Boucle while

```
jai i = 0;
#debut_boucle
verifi i plugran 9 va fin_boucle;
affich i;
jai i = i ajoute 1;
va debut_boucle;
#fin_boucle
```
> Affiche 0 à 9.

### Boucle for (comptée)

```
jai i = 0;
jai n = 5;
#boucle
verifi i preskplugran n va fin;
affich i;
jai i = i ajoute 1;
va boucle;
#fin
```
> Affiche 0 à 4.

### Itération sur une liste

```
jai liste = [10, 20, 30, 40];
jai i = 0;
#iter
verifi i preskplugran taille liste va fin_iter;
affich liste de i;
jai i = i ajoute 1;
va iter;
#fin_iter
```

---

## 12. Fonctions utilitaires

| Fonction       | Syntaxe          | Description                          | Exemple         | Résultat |
|----------------|------------------|--------------------------------------|-----------------|----------|
| `car`          | `car nombre`     | ASCII code → caractère               | `car 65`        | `'A'`    |
| `taille`       | `taille liste`   | Longueur d'une liste                 | `taille [1,2,3]`| `3`      |
| `premier`      | `premier liste`  | Premier élément d'une liste          | `premier [5,6]` | `5`      |
| `dernier`      | `dernier liste`  | Dernier élément d'une liste          | `dernier [5,6]` | `6`      |
| `de`           | `liste de index` | Accès par index                      | `liste de 2`    | valeur   |

---

## 13. Exemples complets

### Fibonacci (n premiers termes)

```
jai n = 10;
jai a = 0;
jai b = 1;
jai i = 0;
#boucle
verifi i plugran n va fin;
affich a;
jai temp = b;
jai b = a ajoute b;
jai a = temp;
jai i = i ajoute 1;
va boucle;
#fin
```

### Factorielle

```
jai n = 7;
jai resultat = 1;
jai i = 1;
#boucle
verifi i plugran n va fin;
jai resultat = resultat multipli i;
jai i = i ajoute 1;
va boucle;
#fin
affich resultat;
```

### FizzBuzz (1 à 20)

```
jai i = 1;
#boucle
verifi i plugran 20 va fin;
verifi i modulo 15 egale 0 va fizzbuzz;
verifi i modulo 3 egale 0 va fizz;
verifi i modulo 5 egale 0 va buzz;
affich i;
va suite;
#fizzbuzz
affich 'FizzBuzz';
va suite;
#fizz
affich 'Fizz';
va suite;
#buzz
affich 'Buzz';
#suite
jai i = i ajoute 1;
va boucle;
#fin
```

### Inversion d'une liste

```
jai original = [1, 2, 3, 4, 5];
jai inverse = [];
jai i = taille original enleve 1;
#boucle
verifi i plupti 0 va fin;
pousse original de i dans inverse;
jai i = i enleve 1;
va boucle;
#fin
affich inverse;
```

### Tri à bulles

```
jai liste = [5, 3, 8, 1, 9, 2, 7, 4, 6];
jai n = taille liste;
jai i = 0;
#outer
verifi i preskplugran n enleve 1 va fin;
jai j = 0;
#inner
verifi j preskplugran n enleve i enleve 2 va next_outer;
jai a = liste de j;
jai b = liste de (j ajoute 1);
verifi a preskplupti b va no_swap;
jai liste de j = b;
jai liste de (j ajoute 1) = a;
#no_swap
jai j = j ajoute 1;
va inner;
#next_outer
jai i = i ajoute 1;
va outer;
#fin
affich liste;
```

---

## 14. Référence des mots-clés

| Mot-clé        | Catégorie       | Description                              |
|----------------|-----------------|------------------------------------------|
| `jai`          | Variable        | Déclare ou assigne une variable          |
| `affich`       | I/O             | Affiche une valeur                       |
| `va`           | Contrôle        | Saut inconditionnel vers un label        |
| `verifi`       | Contrôle        | Saut conditionnel vers un label          |
| `#label`       | Contrôle        | Définit un label (destination de saut)   |
| `pousse`       | Liste           | Ajoute un élément en fin de liste        |
| `tire`         | Liste           | Ajoute un élément en début de liste      |
| `dans`         | Liste           | Utilisé avec `pousse`/`tire`             |
| `de`           | Liste           | Accès par index                          |
| `taille`       | Liste           | Longueur d'une liste                     |
| `premier`      | Liste           | Premier élément                          |
| `dernier`      | Liste           | Dernier élément                          |
| `car`          | Utilitaire      | Code ASCII → caractère                   |
| `ajoute`       | Arithmétique    | Addition                                 |
| `enleve`       | Arithmétique    | Soustraction                             |
| `multipli`     | Arithmétique    | Multiplication                           |
| `divise`       | Arithmétique    | Division                                 |
| `modulo`       | Arithmétique    | Modulo                                   |
| `egale`        | Comparaison     | Égalité                                  |
| `different`    | Comparaison     | Inégalité                                |
| `plugran`      | Comparaison     | Strictement supérieur (`>`)              |
| `plupti`       | Comparaison     | Strictement inférieur (`<`)              |
| `preskplugran` | Comparaison     | Supérieur ou égal (`>=`)                 |
| `preskplupti`  | Comparaison     | Inférieur ou égal (`<=`)                 |
| `et`           | Booléen         | ET logique                               |
| `ou`           | Booléen         | OU logique                               |
| `non`          | Booléen         | NON logique                              |
| `true`/`false` | Booléen         | Littéraux booléens                       |
