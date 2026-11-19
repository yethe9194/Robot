import type { Config } from "jest";
import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset({});
const jestConfig = {
    ...presetConfig,
    testEnvironment: 'node',
    testMatch: [
        '**/test/**/*.test.ts'
    ],
    moduleNameMapper: {
        '^#src/(.*)$': '<rootDir>/src/$1.ts', 
        '^#test/(.*)$': '<rootDir>/test/$1.ts',
    },
    roots: [ "src", "test" ]
};

export default jestConfig;
