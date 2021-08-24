const fs = require('fs')
const chalk = require('chalk')

//function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes()
    // console.log(notes)

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    }
    else {
        console.log(chalk.red.inverse('Title Already Taken!'))
    }
}

//function to remove a note
const removeNote = (title) => {
    // console.log(title);
    const notes = loadNotes()
    if (notes.length === 0) {
        console.log(chalk.red.inverse('No notes available'))
    }
    else {
        const notesToKeep = notes.filter((note) => note.title !== title)
        saveNotes(notesToKeep)
        if (notesToKeep.length < notes.length) {
            console.log(chalk.green.inverse('Note ' + title + ' removed'))
        }
        else {
            console.log(chalk.red.inverse('Note ' + title + ' not found'))
        }
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.green.inverse('Your Notes'))
    notes.forEach(element => console.log(element.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find((note) => note.title === title)

    if (duplicateNotes) {
        console.log(chalk.green.inverse('There you go --> '))
        console.log(duplicateNotes.title)
        console.log(duplicateNotes.body)
    }
    else {
        console.log(chalk.red.inverse('No such title found!'))
    }
}

//function to save a note array
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//function to load notes
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}