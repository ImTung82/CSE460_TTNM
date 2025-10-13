import { describe, it, expect } from "vitest";
import { validateBookName, validateQuantity, validatePrice } from "../components/user/CheckoutCart/Cart";

// Kiểm thử validateBookName
describe("validateBookName", () => {
  it("Tên sách trống → báo lỗi", () => {
    expect(validateBookName("")).toBe("Tên sách không được để trống");
  });

  it("Tên sách chỉ chứa khoảng trắng → báo lỗi", () => {
    expect(validateBookName("   ")).toBe("Tên sách không được để trống");
  });

  it("Tên sách vượt quá 250 ký tự → báo lỗi", () => {
    const longName = "a".repeat(251);
    expect(validateBookName(longName)).toBe("Tên sách vượt quá 250 ký tự");
  });

  it("Tên sách có ký tự đặc biệt không hợp lệ → báo lỗi", () => {
    expect(validateBookName("Sách @hay#")).toBe("Tên sách không hợp lệ");
  });

  it("Tên sách hợp lệ → không lỗi", () => {
    expect(validateBookName("Lập trình C++ cơ bản")).toBe("");
  });
});

// Kiểm thử validateQuantity
describe("validateQuantity", () => {
  it("Số lượng không phải số nguyên → báo lỗi", () => {
    expect(validateQuantity("10.5")).toBe("Số lượng phải là số nguyên");
  });

  it("Số lượng không phải số → báo lỗi", () => {
    expect(validateQuantity("abc")).toBe("Số lượng phải là số nguyên");
  });

  it("Số lượng nhỏ hơn 1 → báo lỗi", () => {
    expect(validateQuantity("0")).toBe("Số lượng phải lớn hơn hoặc bằng 1");
  });

  it("Số lượng lớn hơn 99 → báo lỗi", () => {
    expect(validateQuantity("100")).toBe("Số lượng vượt quá giới hạn cho phép");
  });

  it("Số lượng hợp lệ → không lỗi", () => {
    expect(validateQuantity("5")).toBe("");
  });
});

// Kiểm thử validatePrice
describe("validatePrice", () => {
  it("Giá không phải số → báo lỗi", () => {
    expect(validatePrice("abc")).toBe("Đơn giá phải là số");
  });

  it("Giá âm → báo lỗi", () => {
    expect(validatePrice("-10")).toBe("Đơn giá không được âm");
  });

  it("Giá bằng 0 → không lỗi", () => {
    expect(validatePrice("0")).toBe("");
  });

  it("Giá hợp lệ → không lỗi", () => {
    expect(validatePrice("15000")).toBe("");
  });
});
