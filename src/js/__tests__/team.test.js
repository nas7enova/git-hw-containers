import { Team, Character } from '../app.js';

function test(description, fn) {
    try {
        fn();
        console.log(`+ ${description}`);
    } catch (error) {
        console.error(`- ${description}`);
        console.error(`   ${error.message}`);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, got ${actual}`);
            }
        },
        toEqual(expected) {
            const actualStr = JSON.stringify(actual);
            const expectedStr = JSON.stringify(expected);
            if (actualStr !== expectedStr) {
                throw new Error(`Expected ${expectedStr}, got ${actualStr}`);
            }
        },
        toThrow(expectedMessage) {
            try {
                actual();
                throw new Error('Function did not throw');
            } catch (error) {
                if (error.message !== expectedMessage) {
                    throw new Error(`Expected "${expectedMessage}", got "${error.message}"`);
                }
            }
        },
        toContain(item) {
            if (!actual.includes(item)) {
                throw new Error(`Expected array to contain ${item}`);
            }
        },
        toHaveLength(length) {
            if (actual.length !== length) {
                throw new Error(`Expected length ${length}, got ${actual.length}`);
            }
        }
    };
}

test('should create empty team', () => {
    const team = new Team();
    expect(team.members.size).toBe(0);
    expect(team.toArray()).toEqual([]);
});

test('should add character to team', () => {
    const team = new Team();
    const character = new Character('Лучник', 'Bowman');
    team.add(character);
    expect(team.members.size).toBe(1);
    expect(team.toArray()).toContain(character);
});

test('should throw error when adding duplicate character', () => {
    const team = new Team();
    const character = new Character('Лучник', 'Bowman');
    team.add(character);
    expect(() => team.add(character)).toThrow('Персонаж уже добавлен в команду');
});

test('should add multiple characters', () => {
    const team = new Team();
    const char1 = new Character('Лучник', 'Bowman');
    const char2 = new Character('Мечник', 'Swordsman');
    const char3 = new Character('Маг', 'Magician');
    
    team.addAll(char1, char2, char3);
    expect(team.members.size).toBe(3);
    expect(team.toArray()).toHaveLength(3);
    expect(team.toArray()).toEqual([char1, char2, char3]);
});

test('addAll should handle duplicates without error', () => {
    const team = new Team();
    const char1 = new Character('Лучник', 'Bowman');
    const char2 = new Character('Мечник', 'Swordsman');
    
    team.add(char1);
    team.addAll(char1, char2);
    
    expect(team.members.size).toBe(2);
    expect(team.toArray()).toHaveLength(2);
    expect(team.toArray()).toEqual([char1, char2]);
});

test('toArray should convert Set to Array', () => {
    const team = new Team();
    const char1 = new Character('Лучник', 'Bowman');
    const char2 = new Character('Мечник', 'Swordsman');
    
    team.addAll(char1, char2);
    const result = team.toArray();
    
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(char1);
    expect(result[1]).toBe(char2);

test('addAll with no arguments should not change team', () => {
    const team = new Team();
    team.addAll();
    expect(team.members.size).toBe(0);
    expect(team.toArray()).toEqual([]);
});

console.log('\n=== Все тесты завершены ===');
});