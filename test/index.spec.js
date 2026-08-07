import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src";

describe("ZenGlance API root", () => {
	it("returns health-check JSON (unit style)", async () => {
		const request = new Request("http://example.com/");
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			name: "ZenGlance API",
			version: "0.1.0",
			status: "healthy",
		});
	});

	it("returns health-check JSON (integration style)", async () => {
		const response = await SELF.fetch("http://example.com/");
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			name: "ZenGlance API",
			version: "0.1.0",
			status: "healthy",
		});
	});
});
