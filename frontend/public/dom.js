import { updateHabit } from "./api.js";

export function createHabitElement(habit, habitsContainer) {
  let habitElement = document.createElement("div");
  let today = new Date().toISOString().slice(0, 10);

  habitElement.classList.add("habit", "card", "habit-square");
  if (habit.daysDone[today]) {
    habitElement.classList.add("habit-done");
  }
  habitElement.textContent = habit.title;

  habitElement.addEventListener("click", async () => {
    const updateHabitData = { ...habit };
    updateHabitData.daysDone[today] = !habit.daysDone[today];

    const updatedHabit = await updateHabit(updateHabitData);
    if (updatedHabit) {
      habitElement.classList.toggle("habit-done");
    }
  });

  habitsContainer.appendChild(habitElement);
}

// Affiche les habitudes dans le DOM
export function renderHabits(habits, habitsContainer) {
  habitsContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter les nouvelles habitudes
  habits.forEach((habit) => createHabitElement(habit, habitsContainer));
}

// Gère l'ouverture et la fermeture de la boîte de dialogue
export function setupModalControls(dialog, openModalButton, closeModalButton) {
  closeModalButton.addEventListener("click", () => dialog.close());
  openModalButton.addEventListener("click", () => dialog.showModal());
}

// Récupère la valeur du champ d'entrée
export function getHabitInputValue(habitNameInput) {
  const habitName = habitNameInput.value.trim();
  habitNameInput.value = "";
  return habitName;
}
