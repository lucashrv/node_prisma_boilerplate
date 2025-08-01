import { startServer } from "@/server";

it("Should sum", () => {
    expect(startServer()).toBe("Server is starting...");
});
