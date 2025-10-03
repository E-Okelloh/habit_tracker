const db = require('../config/database');

class Entry {
  static getByHabit(habitId, startDate, endDate) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM entries WHERE habit_id = ?';
      const params = [habitId];

      if (startDate) {
        query += ' AND date >= ?';
        params.push(startDate);
      }
      if (endDate) {
        query += ' AND date <= ?';
        params.push(endDate);
      }

      query += ' ORDER BY date DESC';

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getAll(startDate, endDate) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM entries WHERE 1=1';
      const params = [];

      if (startDate) {
        query += ' AND date >= ?';
        params.push(startDate);
      }
      if (endDate) {
        query += ' AND date <= ?';
        params.push(endDate);
      }

      query += ' ORDER BY date DESC';

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static create(entry) {
    return new Promise((resolve, reject) => {
      const { habit_id, completed, mood, notes, date } = entry;
      db.run(
        'INSERT INTO entries (habit_id, completed, mood, notes, date) VALUES (?, ?, ?, ?, ?)',
        [habit_id, completed !== false ? 1 : 0, mood, notes, date],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...entry });
        }
      );
    });
  }

  static update(id, entry) {
    return new Promise((resolve, reject) => {
      const { completed, mood, notes } = entry;
      db.run(
        'UPDATE entries SET completed = ?, mood = ?, notes = ? WHERE id = ?',
        [completed, mood, notes, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, changes: this.changes });
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM entries WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Entry;