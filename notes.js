const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
  return 'Your notes';
};

const addNote = function(title, body) {
  const notes = loadNotes();
  const dupes = notes.filter(function(note) {
    return note.title === title;
  });

  if (dupes.length === 0) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log('New note added.');
  } else {
    console.log('Note title already exists.');
  }
};

const deleteNote = function(title) {
  const notes = loadNotes();
  const remaining = notes.filter(function(note) {
    return note.title !== title;
  });

  if (remaining.length < notes.length) {
    saveNotes(remaining);
    console.log(chalk.green('Note deleted.'));
  } else {
    console.log(chalk.red('Note not found for deletion. Check your title'));
  }
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  getNotes,
  addNote,
  deleteNote
};
