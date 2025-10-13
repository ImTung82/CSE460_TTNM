import { describe, test, expect } from "vitest";
import { validateBookName, validateQuantity, validatePrice } from "./Cart";

// Kiểm thử validateBookName
describe("validateBookName", () => {
  test("Tên sách trống → báo lỗi", () => {
    expect(validateBookName("")).toBe("Tên sách không được để trống");
  });

  test("Tên sách chỉ chứa khoảng trắng → báo lỗi", () => {
    expect(validateBookName("   ")).toBe("Tên sách không được để trống");
  });

  test("Tên sách vượt quá 250 ký tự → báo lỗi", () => {
    const longName = "a".repeat(251);
    expect(validateBookName(longName)).toBe("Tên sách vượt quá 250 ký tự");
  });

  test("Tên sách có ký tự đặc biệt không hợp lệ → báo lỗi", () => {
    expect(validateBookName("Sách @hay#")).toBe("Tên sách không hợp lệ");
  });

  test("Tên sách hợp lệ → không lỗi", () => {
    expect(validateBookName("Lập trình C++ cơ bản")).toBe("");
  });
});

// Kiểm thử validateQuantity
describe("validateQuantity", () => {
  test("Số lượng không phải số nguyên → báo lỗi", () => {
    expect(validateQuantity("10.5")).toBe("Số lượng phải là số nguyên");
  });

  test("Số lượng không phải số → báo lỗi", () => {
    expect(validateQuantity("abc")).toBe("Số lượng phải là số nguyên");
  });

  test("Số lượng nhỏ hơn 1 → báo lỗi", () => {
    expect(validateQuantity("0")).toBe("Số lượng phải lớn hơn hoặc bằng 1");
  });

  test("Số lượng lớn hơn 99 → báo lỗi", () => {
    expect(validateQuantity("100")).toBe("Số lượng vượt quá giới hạn cho phép");
  });

  test("Số lượng hợp lệ → không lỗi", () => {
    expect(validateQuantity("5")).toBe("");
  });
});

// Kiểm thử validatePrice
describe("validatePrice", () => {
  test("Giá không phải số → báo lỗi", () => {
    expect(validatePrice("abc")).toBe("Đơn giá phải là số");
  });

  test("Giá âm → báo lỗi", () => {
    expect(validatePrice("-10")).toBe("Đơn giá không được âm");
  });

  test("Giá bằng 0 → không lỗi", () => {
    expect(validatePrice("0")).toBe("");
  });

  test("Giá hợp lệ → không lỗi", () => {
    expect(validatePrice("15000")).toBe("");
  });
});
