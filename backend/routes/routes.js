import * as businessLogic from "../services/businessLogic.js";

export default function (fastify, opt, done) {
  fastify.get("/", async (request, reply) => {
    try {
      const habits = await businessLogic.getHabits();
      return { habits };
    } catch (error) {
      reply
        .status(500)
        .send({ message: "Error loading habits", error: error.message });
    }
  });

  fastify.get("/:id", async (request, response) => {
    try {
      const habitId = parseInt(request.params.id);
      const habit = await businessLogic.getHabitById(habitId);
      if (habit) {
        return response.send({ habit });
      } else {
        return response.status(404).send({ message: "Habit not found" });
      }
    } catch (error) {
      reply
        .status(500)
        .send({ message: "Error loading habits", error: error.message });
    }
  });

  fastify.get("/today", async (request, response) => {
    try {
      console.log("ICI");
      const todayHabits = await businessLogic.getHabitsOfTheDay();
      if (todayHabits) {
        return response.send({ todayHabits });
      } else {
        return response
          .status(404)
          .send({ message: "No habits found for today" });
      }
    } catch (error) {
      reply.status(500);
      return response
        .status(404)
        .send({ message: "No habits found for today" });
    }
  });

  fastify.post("/", async (request, reply) => {
    try {
      const newHabit = request.body;
      const addedHabit = await businessLogic.addHabit(newHabit);
      return reply.status(201).send({ habit: addedHabit });
    } catch (error) {
      reply
        .status(500)
        .send({ message: "Error adding habit", error: error.message });
    }
  });

  fastify.patch("/:id", async (request, reply) => {
    const habitId = parseInt(request.params.id);
    const updates = request.body;

    try {
      const updatedHabit = await businessLogic.updateHabit(habitId, updates);
      if (updatedHabit) {
        return reply.status(200).send({ habit: updatedHabit });
      } else {
        return reply.status(404).send({ message: "Habit not found" });
      }
    } catch (error) {
      reply
        .status(500)
        .send({ message: "Error updating habit", error: error.message });
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    try {
      const habitId = parseInt(request.params.id); // Récupérer l'ID depuis les paramètres
      const deletedHabit = await businessLogic.deleteHabitById(habitId);

      if (deletedHabit) {
        return reply
          .status(200)
          .send({ message: "Habit deleted", habit: deletedHabit });
      } else {
        return reply.status(404).send({ message: "Habit not found" });
      }
    } catch (error) {
      return reply
        .status(500)
        .send({ message: "Error deleting habit", error: error.message });
    }
  });
  done();
}
