import { describe, expect, it } from "vitest";
import authReducer, { setIsAuthorized } from "../../src/slices/authSlice";

/**
 * skenario tes authReducer
 *
 * - fungsi authReducers
 * - should return the initial state when given by unknown action
 * - should return the isAuthorized when given by setIsAuthorized action
 */

describe("authReducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = { isAuthorized: false };
    const unknownAction = { type: "UNKNOWN_ACTION" };

    const nextState = authReducer(initialState, unknownAction);

    expect(nextState).toEqual(initialState);
  });

  it("should return the isAuthorized when given by setIsAuthorized action", () => {
    const initialState = { isAuthorized: false };
    const payload = true;
    const action = setIsAuthorized(payload);

    const nextState = authReducer(initialState, action);

    expect(nextState.isAuthorized).toBe(true);
  });

  it("should return the isAuthorized when given by setIsAuthorized action", () => {
    const initialState = { isAuthorized: true };
    const payload = false;
    const action = setIsAuthorized(payload);

    const nextState = authReducer(initialState, action);

    expect(nextState.isAuthorized).toBe(false);
  });
});
