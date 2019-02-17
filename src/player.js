class Player {
    constructor(name, role, country, id) {
        this.name = name;
        this.role = role;
        this.country = country;
        this.id = id;
    }

    static validateCountry(player) {
        if (typeof player.country !== 'string') {
            throw new Error(`Player country must be a string! Invalid value: ${player.country}`)
        }
    }

    static validateRole(player) {
        if (typeof player.role !== 'string') {
            throw new Error(`Player role must be a string! Invalid value: ${player.role}`)
        }
    }

    static validateName(player) {
        if (typeof player.name !== 'string') {
            throw new Error(`Player name must be a string! Invalid value: ${player.name}`);
        }
    }

    static validateId(player) {
        if (typeof player.id !== 'number') {
            throw new Error(`Player id must be a number! Invalid value: ${player.id}`)
        }
    }
}

export default Player;