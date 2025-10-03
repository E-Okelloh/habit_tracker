const Entry = require('../models/Entry');

exports.getEntries = async (req, res, next) => {
  try {
    const { habitId, startDate, endDate } = req.query;
    
    let entries;
    if (habitId) {
      entries = await Entry.getByHabit(habitId, startDate, endDate);
    } else {
      entries = await Entry.getAll(startDate, endDate);
    }
    
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

exports.createEntry = async (req, res, next) => {
  try {
    const entry = await Entry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Entry already exists for this date' });
    }
    next(error);
  }
};

exports.updateEntry = async (req, res, next) => {
  try {
    const result = await Entry.update(req.params.id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    next(error);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    const result = await Entry.delete(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};