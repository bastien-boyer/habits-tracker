import "./style.css";
import { fetchHabits, fetchTodayHabits, addNewHabit } from "./api.js";
import { renderHabits, setupModalControls, getHabitInputValue } from "./dom.js";

const habitsContainer = document.getElementById("habitContainer");
const dialog = document.querySelector("dialog");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeDialog");
const habitNameInput = document.getElementById("habitNameInput");
const addHabitButton = document.getElementById("addNewhabit");

// Fonction pour charger les habitudes en fonction de l'URL
async function loadHabitsBasedOnURL() {
  const currentURL = window.location.pathname; // Récupère le chemin de l'URL
  let habits = [];
  console.log("TOTO");
  if (currentURL === "/habits/today") {
    habits = await fetchTodayHabits(); // Appel API pour les habitudes d'aujourd'hui
  } else {
    habits = await fetchHabits(); // Appel API pour toutes les habitudes
  }

  renderHabits(habits, habitsContainer); // Affiche les habitudes dans le DOM
}

// Récupère et affiche les habitudes dans le DOM
async function loadHabits() {
  const habits = await fetchHabits();
  renderHabits(habits, habitsContainer);
}

// Gère l'ajout d'une nouvelle habitude
addHabitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const habitName = getHabitInputValue(habitNameInput);
  if (habitName) {
    const today = new Date().toISOString().slice(0, 10);
    const newHabit = {
      id: "",
      title: habitName,
      daysDone: { [today]: false },
    };
    await addNewHabit(newHabit);
    loadHabits();
    dialog.close();
  }
});

// Initialise l'application
async function init() {
  setupModalControls(dialog, openModalButton, closeModalButton);
  await loadHabitsBasedOnURL(); // Charge les habitudes au démarrage
}
init();
