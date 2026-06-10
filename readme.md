# DLB — Documentation du langage

DLB est un langage de script interprété, impératif, à base de lignes. Chaque ligne est une instruction. Le programme est exécuté ligne par ligne, avec un pointeur de ligne (`lineIndex`) qui peut être modifié par des sauts conditionnels ou inconditionnels.

Documentation généré avec Claude.
---

## Table des matières

- [DLB — Documentation du langage](#dlb--documentation-du-langage)
  - [Documentation généré avec Claude.](#documentation-généré-avec-claude)
  - [Table des matières](#table-des-matières)
  - [1. Types de valeurs](#1-types-de-valeurs)
  - [2. Variables](#2-variables)
    - [Déclaration et assignation](#déclaration-et-assignation)
    - [Assignation indexée (liste)](#assignation-indexée-liste)
  - [3. Expressions et précédence](#3-expressions-et-précédence)
  - [4. Opérateurs arithmétiques](#4-opérateurs-arithmétiques)
  - [5. Opérateurs de comparaison](#5-opérateurs-de-comparaison)
  - [6. Opérateurs booléens](#6-opérateurs-booléens)
    - [Alias booléens](#alias-booléens)
  - [7. Listes](#7-listes)
    - [Déclaration](#déclaration)
    - [Accès par index (`de`)](#accès-par-index-de)
    - [Assignation par index](#assignation-par-index)
    - [Ajouter des éléments](#ajouter-des-éléments)
    - [Fonctions de liste](#fonctions-de-liste)
  - [8. Chaînes de caractères](#8-chaînes-de-caractères)
    - [Conversion string → liste de caractères (`programme`)](#conversion-string--liste-de-caractères-programme)
  - [9. Affichage](#9-affichage)
    - [Afficher un caractère ASCII](#afficher-un-caractère-ascii)
  - [10. Labels et sauts](#10-labels-et-sauts)
    - [Définir un label](#définir-un-label)
    - [Saut inconditionnel](#saut-inconditionnel)
  - [11. Conditions](#11-conditions)
    - [Émulation if / else if / else](#émulation-if--else-if--else)
    - [Condition composée](#condition-composée)
  - [12. Boucles](#12-boucles)
    - [Boucle while](#boucle-while)
    - [Boucle for (comptée)](#boucle-for-comptée)
    - [Itération sur une liste](#itération-sur-une-liste)
  - [13. Fonctions utilitaires](#13-fonctions-utilitaires)
  - [14. Programmes BrainFuck](#14-programmes-brainfuck)
    - [Exemples BrainFuck](#exemples-brainfuck)
  - [15. Exemples complets](#15-exemples-complets)
    - [Suite de Fibonacci](#suite-de-fibonacci)
    - [Factorielle](#factorielle)
    - [FizzBuzz (1 à 20)](#fizzbuzz-1-à-20)
    - [Tri à bulles](#tri-à-bulles)
    - [Inversion d'une liste](#inversion-dune-liste)
  - [16. Référence complète des mots-clés](#16-référence-complète-des-mots-clés)

---

## 1. Types de valeurs

DLB supporte quatre types de valeurs :

| Type      | Exemple                         | Description                                        |
|-----------|---------------------------------|----------------------------------------------------|
| `number`  | `42`, `3.14`, `-7`              | Entier ou flottant                                 |
| `boolean` | `true`, `false`, `vrai`, `faux` | Valeur booléenne (alias français supportés)        |
| `string`  | `'bonjour'`, `"monde"`          | Chaîne (guillemets simples ou doubles)             |
| `list`    | `[1, 'deux', true]`             | Liste ordonnée, types mixtes, imbrication possible |

---

## 2. Variables

### Déclaration et assignation

```
jai nom = expression;
```

`jai` déclare ou réassigne une variable. Il n'y a pas de distinction entre les deux.

```
jai x = 5;
jai message = 'bonjour';
jai actif = true;
jai pi = 3.14;
jai x = x ajoute 1;
```

### Assignation indexée (liste)

```
jai liste de index = expression;
```

```
jai liste de 0 = 99;
jai tape de (pointer enleve under) = tape de (pointer enleve under) ajoute 1;
```

---

## 3. Expressions et précédence

Les expressions peuvent contenir des littéraux, variables, opérateurs, parenthèses et fonctions unaires. La précédence des opérateurs, du plus faible au plus fort :

| Niveau | Opérateurs                                                                  |
|--------|-----------------------------------------------------------------------------|
| 1      | `ou` (OR)                                                                   |
| 2      | `et` (AND)                                                                  |
| 3      | `egale` `different` `plugran` `plupti` `preskplugran` `preskplupti`         |
| 4      | `ajoute` `enleve`                                                           |
| 5      | `multipli` `divise` `modulo`                                                |
| 6      | `non` `taille` `car` `premier` `dernier`                                    |
| 7      | `de` (indexation — priorité maximale)                                       |

Les parenthèses permettent de forcer l'ordre d'évaluation :

```
jai r = (2 ajoute 3) multipli 4;
```

---

## 4. Opérateurs arithmétiques

| Mot-clé    | Symbole | Description    | Exemple          | Résultat |
|------------|---------|----------------|------------------|----------|
| `ajoute`   | `+`     | Addition       | `3 ajoute 4`     | `7`      |
| `enleve`   | `-`     | Soustraction   | `10 enleve 3`    | `7`      |
| `multipli` | `*`     | Multiplication | `3 multipli 4`   | `12`     |
| `divise`   | `/`     | Division       | `10 divise 4`    | `2.5`    |
| `modulo`   | `%`     | Modulo         | `10 modulo 3`    | `1`      |

```
jai resultat = 2 ajoute 3 multipli 4;
```
> Résultat : `14` (`multipli` prioritaire sur `ajoute`)

```
jai resultat = (2 ajoute 3) multipli 4;
```
> Résultat : `20`

---

## 5. Opérateurs de comparaison

Retournent `true` ou `false`.

| Mot-clé        | Symbole | Description           | Exemple               | Résultat |
|----------------|---------|-----------------------|-----------------------|----------|
| `egale`        | `=`     | Égalité               | `5 egale 5`           | `true`   |
| `different`    | `!=`    | Inégalité             | `5 different 3`       | `true`   |
| `plugran`      | `>`     | Strictement supérieur | `5 plugran 3`         | `true`   |
| `plupti`       | `<`     | Strictement inférieur | `3 plupti 5`          | `true`   |
| `preskplugran` | `>=`    | Supérieur ou égal     | `5 preskplugran 5`    | `true`   |
| `preskplupti`  | `<=`    | Inférieur ou égal     | `3 preskplupti 5`     | `true`   |

---

## 6. Opérateurs booléens

| Mot-clé | Alias | Description  | Exemple           | Résultat |
|---------|-------|--------------|-------------------|----------|
| `et`    | `AND` | ET logique   | `true et false`   | `false`  |
| `ou`    | `OR`  | OU logique   | `true ou false`   | `true`   |
| `non`   | `NOT` | NON logique  | `non false`       | `true`   |

### Alias booléens

`vrai` est un alias de `true`, `faux` est un alias de `false`.

```
jai actif = vrai;
verifi actif egale vrai va continuer;
```

---

## 7. Listes

### Déclaration

```
jai liste = [1, 'deux', true, 3.14];
jai vide = [];
jai matrice = [[1, 2], [3, 4]];
```

### Accès par index (`de`)

Les index commencent à **0**.

```
jai val = liste de 0;
jai val = liste de (i ajoute 1);
```

### Assignation par index

```
jai liste de 0 = 99;
jai liste de i = liste de i ajoute 1;
```

### Ajouter des éléments

| Instruction              | Description                  |
|--------------------------|------------------------------|
| `pousse valeur dans nom` | Ajoute `valeur` à la **fin** |
| `tire valeur dans nom`   | Ajoute `valeur` au **début** |

```
jai liste = [1, 2, 3];
pousse 4 dans liste;
tire 0 dans liste;
affich liste;
```
> Résultat : `[0, 1, 2, 3, 4]`

### Fonctions de liste

| Fonction        | Description         | Exemple            | Résultat   |
|-----------------|---------------------|--------------------|------------|
| `taille liste`  | Nombre d'éléments   | `taille [1, 2, 3]` | `3`        |
| `premier liste` | Premier élément     | `premier [10, 20]` | `10`       |
| `dernier liste` | Dernier élément     | `dernier [10, 20]` | `20`       |
| `liste de i`    | Élément à l'index i | `liste de 1`       | 2e élément |

---

## 8. Chaînes de caractères

Les chaînes peuvent être délimitées par des guillemets simples ou doubles.

```
jai s = 'bonjour';
jai s = "monde";
verifi s egale 'bonjour' va ok;
```

### Conversion string → liste de caractères (`programme`)

`programme` convertit une chaîne en liste de caractères. Particulièrement utile pour les programmes BrainFuck :

```
jai prog = programme '+++++[>++++<-]>.';
```

Équivalent à :
```
jai prog = ['+','+','+','+','+','[','>','+','+','+','+','<','-',']','>','.'];
```

---

## 9. Affichage

```
affich expression;
```

Affiche la valeur de l'expression suivie d'un saut de ligne.

```
affich 'bonjour';
affich 42;
affich x ajoute 1;
affich liste;
affich car 65;
affich true;
```

### Afficher un caractère ASCII

```
affich car 65;     ← A
affich car 97;     ← a
affich car 48;     ← 0
affich car 10;     ← saut de ligne
```

`car` convertit un entier en son caractère ASCII correspondant.

---

## 10. Labels et sauts

### Définir un label

Un label marque une ligne comme destination de saut. Il doit être seul sur sa ligne et commencer par `#`. Les noms peuvent contenir lettres, chiffres et underscores.

```
#debut
#fin_boucle
#op_inc
```

### Saut inconditionnel

```
va label;
```

```
va debut;
va fin_boucle;
```

`va` accepte aussi une expression numérique pour sauter à un numéro de ligne absolu :

```
va 0;
va ip;
```

---

## 11. Conditions

```
verifi condition va label;
```

Si `condition` est vraie, saute au `label`. Sinon, passe à la ligne suivante.

```
jai x = 5;
verifi x plugran 3 va grand;
affich 'petit ou égal';
va suite;
#grand
affich 'grand';
#suite
```

### Émulation if / else if / else

```
verifi x egale 1 va cas_un;
verifi x egale 2 va cas_deux;
affich 'autre cas';
va fin;
#cas_un
affich 'un';
va fin;
#cas_deux
affich 'deux';
#fin
```

### Condition composée

```
verifi x plugran 0 et x plupti 10 va dans_intervalle;
```

---

## 12. Boucles

DLB n'a pas de structure de boucle native. Les boucles s'écrivent avec `verifi` + `va`.

### Boucle while

```
jai i = 0;
#boucle
verifi i preskplugran 10 va fin;
affich i;
jai i = i ajoute 1;
va boucle;
#fin
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

### Itération sur une liste

```
jai liste = [10, 20, 30, 40];
jai i = 0;
#iter
verifi i preskplugran taille liste va fin;
affich liste de i;
jai i = i ajoute 1;
va iter;
#fin
```

---

## 13. Fonctions utilitaires

| Fonction    | Syntaxe            | Description                  | Exemple           | Résultat    |
|-------------|--------------------|------------------------------|-------------------|-------------|
| `car`       | `car nombre`       | Code ASCII → caractère       | `car 65`          | `'A'`       |
| `taille`    | `taille liste`     | Longueur d'une liste         | `taille [1,2,3]`  | `3`         |
| `premier`   | `premier liste`    | Premier élément              | `premier [5, 6]`  | `5`         |
| `dernier`   | `dernier liste`    | Dernier élément              | `dernier [5, 6]`  | `6`         |
| `de`        | `liste de index`   | Accès par index (0-based)    | `liste de 2`      | 3e élément  |
| `programme` | `programme 'code'` | String → liste de caractères | `programme '++'`  | `['+','+']` |

---

## 14. Programmes BrainFuck

`programme` permet d'écrire des programmes BrainFuck sous forme de chaîne plutôt que de tableau de caractères.

```
jai prog = programme '++++++++[>++++++++<-]>+.';
```

Les opérateurs BrainFuck supportés :

| Opérateur | Description                                       |
|-----------|---------------------------------------------------|
| `>`       | Déplace le pointeur vers la droite                |
| `<`       | Déplace le pointeur vers la gauche                |
| `+`       | Incrémente la cellule courante                    |
| `-`       | Décrémente la cellule courante                    |
| `.`       | Affiche le caractère ASCII de la cellule courante |
| `[`       | Début de boucle (saute à `]` si cellule = 0)      |
| `]`       | Fin de boucle (retourne à `[` si cellule ≠ 0)     |

La tape est **dynamique** — elle grandit automatiquement vers la droite (`>`) et vers la gauche (`<`) au besoin.

### Exemples BrainFuck

**Afficher `A` (ASCII 65) :**
```
jai prog = programme '++++++++[>++++++++<-]>+.';
```

**Afficher `Hello World` :**
```
jai prog = programme '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';
```

---

## 15. Exemples complets

### Suite de Fibonacci

```
jai n = 10;
jai a = 0;
jai b = 1;
jai i = 0;
#boucle
verifi i preskplugran n va fin;
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
jai va = liste de j;
jai vb = liste de (j ajoute 1);
verifi va preskplupti vb va no_swap;
jai liste de j = vb;
jai liste de (j ajoute 1) = va;
#no_swap
jai j = j ajoute 1;
va inner;
#next_outer
jai i = i ajoute 1;
va outer;
#fin
affich liste;
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

---

## 16. Référence complète des mots-clés

| Mot-clé        | Catégorie        | Description                                    |
|----------------|------------------|------------------------------------------------|
| `jai`          | Variable         | Déclare ou assigne une variable                |
| `affich`       | I/O              | Affiche une valeur avec saut de ligne          |
| `va`           | Contrôle         | Saut inconditionnel vers un label ou une ligne |
| `verifi`       | Contrôle         | Saut conditionnel (`verifi cond va label;`)    |
| `#label`       | Contrôle         | Définit un label destination de saut           |
| `pousse`       | Liste            | Ajoute un élément en fin de liste              |
| `tire`         | Liste            | Ajoute un élément en début de liste            |
| `dans`         | Liste            | Séparateur utilisé avec `pousse` et `tire`     |
| `de`           | Liste            | Accès par index (`liste de i`)                 |
| `taille`       | Liste/Utilitaire | Longueur d'une liste                           |
| `premier`      | Liste/Utilitaire | Premier élément d'une liste                    |
| `dernier`      | Liste/Utilitaire | Dernier élément d'une liste                    |
| `car`          | Utilitaire       | Code ASCII entier → caractère string           |
| `programme`    | Utilitaire       | Chaîne → liste de caractères                   |
| `ajoute`       | Arithmétique     | Addition (`+`)                                 |
| `enleve`       | Arithmétique     | Soustraction (`-`)                             |
| `multipli`     | Arithmétique     | Multiplication (`*`)                           |
| `divise`       | Arithmétique     | Division (`/`)                                 |
| `modulo`       | Arithmétique     | Modulo (`%`)                                   |
| `egale`        | Comparaison      | Égalité (`=`)                                  |
| `different`    | Comparaison      | Inégalité (`!=`)                               |
| `plugran`      | Comparaison      | Strictement supérieur (`>`)                    |
| `plupti`       | Comparaison      | Strictement inférieur (`<`)                    |
| `preskplugran` | Comparaison      | Supérieur ou égal (`>=`)                       |
| `preskplupti`  | Comparaison      | Inférieur ou égal (`<=`)                       |
| `et`           | Booléen          | ET logique (`AND`)                             |
| `ou`           | Booléen          | OU logique (`OR`)                              |
| `non`          | Booléen          | NON logique (`NOT`)                            |
| `true`/`vrai`  | Booléen          | Littéral vrai                                  |
| `false`/`faux` | Booléen          | Littéral faux                                  |
