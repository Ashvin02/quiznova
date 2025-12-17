import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private questions: Question[] = [
    // 🌍 Culture générale
    { id: 1, text: 'Quelle est la capitale de l’Italie ?', options: ['Rome', 'Milan', 'Venise'], correctAnswer: 0, theme: 'Culture générale' },
    { id: 2, text: 'Quel est le plus grand océan du monde ?', options: ['Atlantique', 'Pacifique', 'Indien'], correctAnswer: 1, theme: 'Culture générale' },
    { id: 3, text: 'Combien de continents existe-t-il ?', options: ['5', '6', '7'], correctAnswer: 2, theme: 'Culture générale' },

    // 🔢 Mathématiques
    { id: 4, text: 'Résultat de 12 × 8 ?', options: ['96', '88', '108'], correctAnswer: 0, theme: 'Mathématiques' },
    { id: 5, text: 'La racine carrée de 81 ?', options: ['7', '9', '11'], correctAnswer: 1, theme: 'Mathématiques' },
    { id: 6, text: 'π est environ égal à ?', options: ['3.14', '2.71', '1.61'], correctAnswer: 0, theme: 'Mathématiques' },

    // 💻 Informatique
    { id: 7, text: 'Quel langage est utilisé par Angular ?', options: ['Java', 'TypeScript', 'Python'], correctAnswer: 1, theme: 'Informatique' },
    { id: 8, text: 'HTML signifie ?', options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperTool Multi Language'], correctAnswer: 0, theme: 'Informatique' },
    { id: 9, text: 'CSS sert à ?', options: ['Structurer le contenu', 'Styliser les pages', 'Programmer la logique'], correctAnswer: 1, theme: 'Informatique' },

    // 📜 Histoire
    { id: 10, text: 'Qui était Napoléon Bonaparte ?', options: ['Un roi', 'Un empereur', 'Un président'], correctAnswer: 1, theme: 'Histoire' },
    { id: 11, text: 'En quelle année a eu lieu la Révolution française ?', options: ['1789', '1848', '1914'], correctAnswer: 0, theme: 'Histoire' },
    { id: 12, text: 'Qui a découvert l’Amérique en 1492 ?', options: ['Christophe Colomb', 'Vasco de Gama', 'Magellan'], correctAnswer: 0, theme: 'Histoire' },

    // 🎶 Arts & culture
    { id: 13, text: 'Qui a peint la Joconde ?', options: ['Michel-Ange', 'Leonard de Vinci', 'Raphaël'], correctAnswer: 1, theme: 'Arts & culture' },
    { id: 14, text: 'Quel est l’instrument principal du jazz ?', options: ['Piano', 'Guitare', 'Saxophone'], correctAnswer: 2, theme: 'Arts & culture' },
    { id: 15, text: 'Quel pays est à l’origine du manga ?', options: ['Chine', 'Japon', 'Corée'], correctAnswer: 1,   theme: 'Arts & culture' },

    // ⚽ Sport
    { id: 16, text: 'Combien de joueurs dans une équipe de football ?', options: ['9', '10', '11'], correctAnswer: 2, theme: 'Sport' },
    { id: 17, text: 'Usain Bolt est célèbre pour ?', options: ['Natation', 'Athlétisme', 'Cyclisme'], correctAnswer: 1, theme: 'Sport' },
    { id: 18, text: 'Le Tour de France est une compétition de ?', options: ['Tennis', 'Cyclisme', 'Rugby'], correctAnswer: 1, theme: 'Sport' },
  ];

  getQuestions(): Question[] {
    return this.questions;
  }
}
