class UserDTO {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }

    static fromModel(user) {
        return new UserDTO(user);
    }
}

module.exports = UserDTO;