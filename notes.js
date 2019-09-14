const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes';
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const dupes = notes.filter(note => note.title === title);

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

const deleteNote = title => {
  const notes = loadNotes();
  const remaining = notes.filter(note => note.title !== title);

  if (remaining.length < notes.length) {
    saveNotes(remaining);
    console.log(chalk.green('Note deleted.'));
  } else {
    console.log(chalk.red('Note not found for deletion. Check your title'));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  notes.forEach(note => {
    console.log(chalk.green('title: ', chalk.white(note.title)));
  });
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
  getNotes,
  addNote,
  deleteNote,
  listNotes
};
