const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const dupe = notes.find(note => note.title === title);

  if (!dupe) {
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

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.blue(note.title));
    console.log(chalk.white(note.body));
  } else {
    console.log(chalk.red('Note not found.'));
  }
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
  addNote,
  deleteNote,
  listNotes,
  readNote
};
