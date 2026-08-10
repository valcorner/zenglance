import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src";

describe("ZenGlance API root", () => {
	it("returns health-check JSON at /health", async () => {
		const request = new Request("http://example.com/health");
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

	it("returns health-check JSON at /health (integration)", async () => {
		const response = await SELF.fetch("http://example.com/health");
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			name: "ZenGlance API",
			version: "0.1.0",
			status: "healthy",
		});
	});

	it("returns 200 and HTML for / (frontend served via ASSETS)", async () => {
		const response = await SELF.fetch("http://example.com/");
		expect(response.status).toBe(200);
		const ct = response.headers.get("content-type") ?? "";
		expect(ct.includes("text/html")).toBe(true);
	});
});
