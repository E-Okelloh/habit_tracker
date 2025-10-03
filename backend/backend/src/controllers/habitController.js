const Habit = require('../models/Habit');
const Analytics = require('../utils/analytics');

exports.getAllHabits = async (req, res, next) => {
  try {
    const habits = await Habit.getAll();
    
    const habitsWithStats = await Promise.all(
      habits.map(async (habit) => {
        const insights = await Analytics.getInsights(habit.id);
        return { ...habit, ...insights };
      })
    );

    res.json(habitsWithStats);
  } catch (error) {
    next(error);
  }
};

exports.getHabit = async (req, res, next) => {
  try {
    const habit = await Habit.getById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    const insights = await Analytics.getInsights(habit.id);
    res.json({ ...habit, ...insights });
  } catch (error) {
    next(error);
  }
};

exports.createHabit = async (req, res, next) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (error) {
    next(error);
  }
};

exports.updateHabit = async (req, res, next) => {
  try {
    const result = await Habit.update(req.params.id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    next(error);
  }
};

exports.deleteHabit = async (req, res, next) => {
  try {
    const result = await Habit.delete(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};