import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/data/dataBase.json");

const loadData = async () => {
  const data = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(data);
};

const saveData = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

export const helloWorldLogic = () => {
  return "world from logic :)";
};

export const getHabits = async () => {
  const data = await loadData();
  return data.habits;
};

export const getHabitById = async (habitId) => {
  const data = await loadData();

  return data.habits.find((habit) => habit.id === habitId);
};

export const getHabitsOfTheDay = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const data = await loadData();
  return data.habits.filter((habit) => habit.daysDone.hasOwnProperty(today));
};

export const addHabit = async (newHabit) => {
  const data = await loadData();
  const today = new Date().toISOString().slice(0, 10); // Date actuelle au format AAAA-MM-JJ

  const newId = data.habits.length
    ? data.habits[data.habits.length - 1].id + 1
    : 1;

  const habitToAdd = {
    ...newHabit,
    id: newId,
    daysDone: { [today]: false },
  };

  data.habits.push(habitToAdd);
  await saveData(data);

  return habitToAdd;
};

export const updateHabit = async (id, updates) => {
  const data = await loadData();
  const habitIndex = data.habits.findIndex((habit) => habit.id === id);

  if (habitIndex === -1) {
    return null; // Retourne null si l'habitude n'est pas trouvée
  }

  // Met à jour l'habitude avec les nouvelles valeurs
  const updatedHabit = { ...data.habits[habitIndex], ...updates };
  data.habits[habitIndex] = updatedHabit;

  await saveData(data); // Sauvegarde les données mises à jour
  return updatedHabit; // Retourne l'habitude mise à jour
};

export const markDayAsDone = async (id, date) => {
  const data = await loadData();
  const habit = data.habits.find((habit) => habit.id === id);
  if (habit) {
    habit.daysDone[date] = true; // Marquer le jour
    await saveData(data); // Sauvegarder les changements
    return habit;
  }
  return null; // Si l'habitude n'existe pas
};

export const deleteHabitById = async (id) => {
  const data = await loadData();

  const habitIndex = data.habits.findIndex((habit) => habit.id === id);

  if (habitIndex === -1) {
    return null;
  }

  const deletedHabit = data.habits.splice(habitIndex, 1)[0];

  await saveData(data);

  return deletedHabit;
};
