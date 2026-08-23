import { ErrorRepository } from '../app.js';

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

test('should create error repository with default errors', () => {
    const errorRepo = new ErrorRepository();
    expect(errorRepo.translate(404)).toBe('Not Found');
    expect(errorRepo.translate(500)).toBe('Internal Server Error');
});

test('should return correct description for existing error code', () => {
    const errorRepo = new ErrorRepository();
    expect(errorRepo.translate(400)).toBe('Bad Request');
    expect(errorRepo.translate(401)).toBe('Unauthorized');
    expect(errorRepo.translate(403)).toBe('Forbidden');
});

test('should return "Unknown error" for non-existent error code', () => {
    const errorRepo = new ErrorRepository();
    expect(errorRepo.translate(999)).toBe('Unknown error');
    expect(errorRepo.translate(123)).toBe('Unknown error');
    expect(errorRepo.translate(0)).toBe('Unknown error');
});

test('should allow adding new errors', () => {
    const errorRepo = new ErrorRepository();
    errorRepo.addError(418, "I'm a teapot");
    expect(errorRepo.translate(418)).toBe("I'm a teapot");
});

test('should update existing error description', () => {
    const errorRepo = new ErrorRepository();
    errorRepo.addError(404, 'Page Not Found');
    expect(errorRepo.translate(404)).toBe('Page Not Found');
});

test('should handle empty Map', () => {
    const emptyRepo = new ErrorRepository();
    emptyRepo.errors.clear();
    expect(emptyRepo.translate(404)).toBe('Unknown error');
});

console.log('\n=== Все тесты завершены ===');