import CashierShiftPresenter from "../CashierShiftPresenter.js";

describe("CashierShiftPresenter", () => {
	const presenter = new CashierShiftPresenter();

	test("should return null when record is falsy", () => {
		expect(presenter.present(null)).toBeNull();
	});

	test("should map numeric fields and defaults", () => {
		const record = {
			id: 1,
			placeId: 2,
			stationId: 3,
			shiftId: 4,
			cashierId: 5,
			openedAt: new Date("2024-01-01T00:00:00.000Z"),
			closingBalance: "50.5",
			systemBalance: null,
			ipAddress: "1.1.1.1",
			status: "open"
		};

		const presented = presenter.present(record);

		expect(presented).toEqual({
			id: 1,
			placeId: 2,
			stationId: 3,
			shiftId: 4,
			cashierId: 5,
			openedAt: record.openedAt,
			closedAt: null,
			openingBalance: 0,
			closingBalance: 50.5,
			systemBalance: null,
			ipAddress: "1.1.1.1",
			status: "open"
		});
	});

	test("should convert balances and closedAt when provided", () => {
		const record = {
			id: 9,
			placeId: 8,
			stationId: 7,
			shiftId: 6,
			cashierId: 5,
			openedAt: new Date("2024-02-02T00:00:00.000Z"),
			closedAt: new Date("2024-02-03T00:00:00.000Z"),
			openingBalance: "10",
			closingBalance: "20.5",
			systemBalance: "25.5",
			ipAddress: "2.2.2.2",
			status: "closed"
		};

		const presented = presenter.present(record);

		expect(presented).toEqual({
			id: 9,
			placeId: 8,
			stationId: 7,
			shiftId: 6,
			cashierId: 5,
			openedAt: record.openedAt,
			closedAt: record.closedAt,
			openingBalance: 10,
			closingBalance: 20.5,
			systemBalance: 25.5,
			ipAddress: "2.2.2.2",
			status: "closed"
		});
	});

	test("should present collection", () => {
		const result = presenter.presentCollection([{ id: 1 }]);

		expect(result).toEqual([
			{
				id: 1,
				placeId: undefined,
				stationId: undefined,
				shiftId: undefined,
				cashierId: undefined,
				openedAt: undefined,
				closedAt: null,
				openingBalance: 0,
				closingBalance: null,
				systemBalance: null,
				ipAddress: undefined,
				status: undefined
			}
		]);
	});
});
