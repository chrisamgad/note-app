
class NoteDTO {
    constructor(note) {
        this.id = note.id;
        this.authorId = note.authorId;
        this.title = note.title;
        this.body = note.body;
        this.createdAt = note.createdAt;
        this.updatedAt = note.updatedAt;
    }

    static fromModel(note) {
        return new NoteDTO(note);
    }

    static fromModels(notes) {
        return notes.map(note => new NoteDTO(note));
    }

}

module.exports = NoteDTO;
