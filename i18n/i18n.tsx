// i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      productivity: "Productivity",
      mood: "Mood",
      firstTask: "First important task of the day",
      anotherKeyTask: "Another key task to complete",
      secondaryTask: "Secondary or minor task",
      additionalTask: "Something additional to do today",
      gratefulQuestion: "Why do you feel grateful today?",
      additionalGrateful: "Something else you feel grateful for",
      learnedQuestion: "Write something you have learned...",
      agenda: "Agenda",
      gratefulFor: "I am grateful for",
      learned: "I have learned",
      loadingQuote: "Loading quote...",
      day: "Day",
      agendaToday: "Agenda for today",
    },
  },
  es: {
    translation: {
      productivity: "Productividad",
      mood: "Ánimo",
      firstTask: "Primera tarea importante del día",
      anotherKeyTask: "Otra tarea clave a completar",
      secondaryTask: "Tarea secundaria o menor",
      additionalTask: "Algo adicional por hacer hoy",
      gratefulQuestion: "¿Por qué te sientes agradecido hoy?",
      additionalGrateful: "Algo más por lo que te sientes agradecido",
      learnedQuestion: "Escribe algo que hayas aprendido...",
      agenda: "Agenda",
      gratefulFor: "Estoy agradecido por",
      learned: "He aprendido",
      loadingQuote: "Cargando cita...",
      day: "Día",
      agendaToday: "Agenda para hoy",
    },
  },
  ca: {
    translation: {
      productivity: "Productivitat",
      mood: "Ànim",
      firstTask: "Primera tasca important del dia",
      anotherKeyTask: "Una altra tasca clau per completar",
      secondaryTask: "Tasca secundària o menor",
      additionalTask: "Alguna cosa addicional per fer avui",
      gratefulQuestion: "Per què et sents agraït avui?",
      additionalGrateful: "Una altra cosa per la qual et sents agraït",
      learnedQuestion: "Escriu alguna cosa que hagis après...",
      agenda: "Agenda",
      gratefulFor: "Estic agraït per",
      learned: "He après",
      loadingQuote: "Carregant cita...",
      day: "Dia",
      agendaToday: "Agenda per avui",
    },
  },
};

const deviceLanguage = Localization.locale.split('-')[0];
const supportedLanguages = ['en', 'es', 'ca'];
const language = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: language,
    fallbackLng: "ca",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
