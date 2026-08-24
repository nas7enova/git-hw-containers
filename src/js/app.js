class Character {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class ErrorRepository {
    constructor() {
        this.errors = new Map([
            [404, "Not Found"],
            [500, "Internal Server Error"],
            [400, "Bad Request"],
            [401, "Unauthorized"],
            [403, "Forbidden"],
        ]);
    }

    translate(code) {
        if (this.errors.has(code)) {
            return this.errors.get(code);
        }
        return "Unknown error";
    }

    addError(code, description) {
        this.errors.set(code, description);
    }
}

class Settings {
    constructor() {
        this.defaultSettings = new Map([
            ["theme", "dark"],
            ["music", "trance"],
            ["difficulty", "easy"]
        ]);

        this.userSettings = new Map();
    }

    setSetting(key, value) {
        if (!this.defaultSettings.has(key)) {
            throw new Error(`Setting "${key}" does not exist`);
        }

        const validValues = this.getValidValues(key);
        if (!validValues.includes(value)) {
            throw new Error(`Недопустимое значение "${value}" для настройки "${key}"`);
        }

        if (this.defaultSettings.get(key) === value) {
            this.userSettings.delete(key);
        } else {
            this.userSettings.set(key, value);
        }
    }

    getValidValues(key) {
        const validValues = {
            "theme": ["dark", "light", "gray"],
            "music": ["trance", "pop", "rock", "chillout", "off"],
            "difficulty": ["easy", "normal", "hard", "nightmare"]
        };
        return validValues[key] || [];
    }

    get settings() {
        const result = new Map(this.defaultSettings);

        for (const [key, value] of this.userSettings) {
            result.set(key, value);
        }

        return result;
    }

    getSetting(key) {
        if (this.userSettings.has(key)) {
            return this.userSettings.get(key);
        }
        return this.defaultSettings.get(key);
    }
}

class Team {
    constructor() {
        this.members = new Set();
    }

    add(character) {
        if (this.members.has(character)) {
            throw new Error("The character has already been added to the team");
        }
        this.members.add(character);
    }

    addAll(...characters) {
        characters.forEach(character => {
            this.members.add(character);
        });
    }

    toArray() {
        return Array.from(this.members);
    }
}

export { Team, Character, ErrorRepository, Settings }