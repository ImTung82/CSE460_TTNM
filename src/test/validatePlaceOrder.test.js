import { describe, it, expect } from "vitest";
import { validateFullName, validatePhone, validateAddress, validateCouponCode } from "../components/user/CheckoutCart/PlaceOrder.jsx";

// validateFullName
describe("validateFullName", () => {
  it("trả lỗi khi để trống", () => {
    expect(validateFullName("")).toBe("Họ tên người nhận không được để trống");
  });

  it("trả lỗi khi chỉ chứa khoảng trắng", () => {
    expect(validateFullName("   ")).toBe("Họ tên người nhận không được để trống");
  });

  it("trả lỗi khi chứa ký tự đặc biệt", () => {
    expect(validateFullName("Nguyễn Văn @A")).toBe("Họ tên người nhận không được chứa kí tự đặc biệt");
  });

  it("trả lỗi khi độ dài < 2", () => {
    expect(validateFullName("A")).toBe("Họ tên người nhận phải có độ dài từ 2 đến 50 ký tự");
  });

  it("trả lỗi khi độ dài > 50", () => {
    const longName = "A".repeat(51);
    expect(validateFullName(longName)).toBe("Họ tên người nhận phải có độ dài từ 2 đến 50 ký tự");
  });

  it("không trả lỗi khi hợp lệ", () => {
    expect(validateFullName("Nguyễn Văn A")).toBe("");
  });
});

// validatePhone
describe("validatePhone", () => {
  it("trả lỗi khi để trống", () => {
    expect(validatePhone("")).toBe("Số điện thoại không được để trống");
  });

  it("trả lỗi khi có ký tự không phải số", () => {
    expect(validatePhone("09a2345678")).toBe("Số điện thoại chỉ được chứa ký tự số (0–9)");
  });

  it("trả lỗi khi không bắt đầu bằng 0", () => {
    expect(validatePhone("1234567890")).toBe("Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0");
  });

  it("trả lỗi khi không đủ 10 chữ số", () => {
    expect(validatePhone("09123")).toBe("Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0");
  });

  it("không trả lỗi khi hợp lệ", () => {
    expect(validatePhone("0912345678")).toBe("");
  });
});

// validateAddress
describe("validateAddress", () => {
  it("trả lỗi khi để trống", () => {
    expect(validateAddress("")).toBe("Địa chỉ không được để trống");
  });

  it("trả lỗi khi chứa ký tự đặc biệt không hợp lệ", () => {
    expect(validateAddress("123 Đường ABC @HCM")).toBe("Địa chỉ không hợp lệ, không được chứa ký tự đặc biệt");
  });

  it("trả lỗi khi độ dài < 5", () => {
    expect(validateAddress("abc")).toBe("Địa chỉ phải có độ dài từ 5 đến 255 ký tự");
  });

  it("trả lỗi khi độ dài > 255", () => {
    const longAddress = "A".repeat(256);
    expect(validateAddress(longAddress)).toBe("Địa chỉ phải có độ dài từ 5 đến 255 ký tự");
  });

  it("không trả lỗi khi hợp lệ", () => {
    expect(validateAddress("123 Nguyễn Trãi, Quận 1, TP.HCM")).toBe("");
  });
});

// validateCouponCode
describe("validateCouponCode", () => {
  it("trả về rỗng khi để trống", () => {
    expect(validateCouponCode("")).toBe("");
  });

  it("trả lỗi khi chứa ký tự đặc biệt", () => {
    expect(validateCouponCode("SALE@2025")).toBe("Mã khuyến mãi không hợp lệ, chỉ được chứa chữ và số");
  });

  it("trả lỗi khi độ dài < 3", () => {
    expect(validateCouponCode("AB")).toBe("Mã khuyến mãi phải có độ dài từ 3 đến 20 ký tự");
  });

  it("trả lỗi khi độ dài > 20", () => {
    const longCode = "A".repeat(21);
    expect(validateCouponCode(longCode)).toBe("Mã khuyến mãi phải có độ dài từ 3 đến 20 ký tự");
  });

  it("trả lỗi khi mã không tồn tại", () => {
    expect(validateCouponCode("HELLO2025")).toBe("Mã khuyến mãi không tồn tại hoặc đã hết hạn sử dụng");
  });

  it("không trả lỗi khi mã hợp lệ", () => {
    expect(validateCouponCode("SALE2025")).toBe("");
    expect(validateCouponCode("discount20")).toBe("");
    expect(validateCouponCode("newuser")).toBe("");
  });
});
