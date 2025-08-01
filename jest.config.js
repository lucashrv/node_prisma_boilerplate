/** @type {import("jest").Config} **/
export default {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1",
  },
};