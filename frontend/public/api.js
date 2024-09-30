const API_URL = "http://localhost:3000/habits";

export async function fetchTodayHabits() {
  try {
    const response = await fetch(API_URL + "/today", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.todayHabits;
  } catch (error) {
    console.error("Error fetching habits:", error);
    return [];
  }
}

export async function fetchHabits() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.habits;
  } catch (error) {
    console.error("Error fetching habits:", error);
    return [];
  }
}

export async function updateHabit(habit) {
  try {
    const response = await fetch(`${API_URL}/${habit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error("Failed to update habit");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating habit:", error);
  }
}

export async function addNewHabit(habit) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    });
    if (!response.ok) {
      throw new Error("Failed to add new habit");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding new habit:", error);
  }
}
