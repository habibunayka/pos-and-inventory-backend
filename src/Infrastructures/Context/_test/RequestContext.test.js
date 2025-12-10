import {
	buildInitialContext,
	runWithRequestContext,
	getRequestContext,
	setRequestContextUser,
	setRequestContextValue,
	withActivityLoggingSuppressed
} from "../RequestContext.js";

describe("RequestContext", () => {
	test("builds default context values and overrides metadata", () => {
		const base = buildInitialContext();
		expect(base.source).toBe("system");

		const result = runWithRequestContext(undefined, () => {
			const context = getRequestContext();
			expect(context.source).toBe("system");
			expect(context.user).toBeNull();
			expect(context.userId).toBeNull();
			expect(context.skipActivityLogging).toBe(false);
			expect(context.requestId).toBeDefined();
			expect(context.metadata).toEqual({});
			return context.requestId;
		});

		expect(result).toBeDefined();

		runWithRequestContext(
			{
				requestId: "override-id",
				source: "http",
				user: { id: 99 },
				metadata: { trace: "abc" },
				skipActivityLogging: true
			},
			() => {
				const context = getRequestContext();
				expect(context.requestId).toBe("override-id");
				expect(context.source).toBe("http");
				expect(context.userId).toBe(99);
				expect(context.metadata).toEqual({ trace: "abc" });
			}
		);
	});

	test("sets user and arbitrary values safely", () => {
		// Calling setter without a store should be a no-op
		expect(() => setRequestContextUser({ id: 1 })).not.toThrow();
		expect(() => setRequestContextValue(null, "x")).not.toThrow();
		expect(getRequestContext()).toBeNull();
		expect(() => setRequestContextValue("orphan", "value")).not.toThrow();

		runWithRequestContext({}, () => {
			setRequestContextUser({ id: 7, name: "Jane" });
			expect(getRequestContext().userId).toBe(7);
			setRequestContextUser(null);
			expect(getRequestContext().user).toBeNull();
			expect(getRequestContext().userId).toBeNull();
			setRequestContextUser({});

			setRequestContextValue("custom", "value");

			const context = getRequestContext();
			expect(context.user).toEqual({});
			expect(context.userId).toBeNull();
			expect(context.custom).toBe("value");
		});
	});

	test("suppresses activity logging for sync, async, and error flows", async () => {
		const result = withActivityLoggingSuppressed(() => "no-store");
		expect(result).toBe("no-store");

		runWithRequestContext({}, () => {
			const syncResult = withActivityLoggingSuppressed(() => {
				expect(getRequestContext().skipActivityLogging).toBe(true);
				return "sync";
			});
			expect(syncResult).toBe("sync");
			expect(getRequestContext().skipActivityLogging).toBe(false);
		});

		await runWithRequestContext({}, async () => {
			const promise = withActivityLoggingSuppressed(() => Promise.resolve("async"));
			expect(getRequestContext().skipActivityLogging).toBe(true);

			const value = await promise;
			expect(value).toBe("async");
			expect(getRequestContext().skipActivityLogging).toBe(false);
		});

		runWithRequestContext({}, () => {
			expect(() =>
				withActivityLoggingSuppressed(() => {
					throw new Error("fail");
				})
			).toThrow("fail");
			expect(getRequestContext().skipActivityLogging).toBe(false);
		});
	});
});
