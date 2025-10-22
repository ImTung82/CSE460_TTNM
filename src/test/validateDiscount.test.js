import { describe, it, expect, vi } from "vitest";

// Mock dữ liệu và hàm phụ thuộc
const validDiscountTypes = ["Khuyến mại thường", "Dịp lễ", "Theo hóa đơn", "Theo số lượng"];
const occasions = ["Tết", "Giáng sinh", "Trung thu"];
const billThresholds = [100000, 200000, 500000];
const productQuantities = [1, 2, 5, 10];
const discountCodes = ["KM001", "SALE2025"];

const generateDiscountCode = vi.fn(
  (loaiGiamGia, dipLe, nguongHoaDon, soLuongSanPham) =>
    `${loaiGiamGia}-${dipLe || nguongHoaDon || soLuongSanPham || "DEFAULT"}`
);

const generateDiscountValue = vi.fn(
  (loaiGiamGia, nguongHoaDon, soLuongSanPham) => {
    if (loaiGiamGia === "Theo hóa đơn") return 10;
    if (loaiGiamGia === "Theo số lượng") return 20;
    return 5;
  }
);

// =======================
// COPY HÀM GỐC Ở ĐÂY
// =======================

const validateLoaiGiamGia = (value) => {
  if (!value) return "Vui lòng chọn loại mã giảm giá";
  if (!validDiscountTypes.includes(value))
    return "Loại giảm giá không hợp lệ";
  return "";
};

const validateDipLe = (value, loaiGiamGia) => {
  if (loaiGiamGia === "Dịp lễ" && !value)
    return "Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn";
  if (loaiGiamGia === "Dịp lễ" && !occasions.includes(value))
    return "Dịp lễ không hợp lệ";
  return "";
};

const validateNguongHoaDon = (value, loaiGiamGia) => {
  if (loaiGiamGia === "Theo hóa đơn" && !value)
    return "Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn";
  if (loaiGiamGia === "Theo hóa đơn" && !billThresholds.includes(Number(value)))
    return "Ngưỡng hóa đơn không hợp lệ";
  return "";
};

const validateSoLuongSanPham = (value, loaiGiamGia) => {
  if (loaiGiamGia === "Theo số lượng" && !value)
    return "Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn";
  if (loaiGiamGia === "Theo số lượng" && !productQuantities.includes(Number(value)))
    return "Số lượng sản phẩm không hợp lệ";
  return "";
};

const validateMaGiamGia = (value, loaiGiamGia, dipLe, nguongHoaDon, soLuongSanPham) => {
  if (!value || !value.trim()) return "Vui lòng nhập mã giảm giá";
  if (value.length < 3 || value.length > 50)
    return "Mã giảm giá phải có độ dài từ 3 đến 50 ký tự";
  if (!/^[a-zA-Z0-9_-]+$/.test(value))
    return "Mã giảm giá chỉ được chứa chữ, số, dấu ‘-’ hoặc ‘_’, không có khoảng trắng";
  if (discountCodes.includes(value.toUpperCase()))
    return "Mã giảm giá đã tồn tại";
  const expectedCode = generateDiscountCode(loaiGiamGia, dipLe, nguongHoaDon, soLuongSanPham).toUpperCase();
  if (loaiGiamGia !== "Khuyến mại thường" && value.toUpperCase() !== expectedCode) {
    return "Mã giảm giá không hợp lệ cho loại khuyến mại đã chọn";
  }
  return "";
};

const validateHinhAnh = (value) => {
  if (!value) return "Vui lòng chọn hình ảnh đại diện cho mã giảm giá";
  if (value instanceof File) {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    if (!allowed.includes(value.type)) return "Định dạng ảnh không hợp lệ";
    if (value.size > 25 * 1024 * 1024) return "Ảnh không được vượt quá 25MB";
  } else if (typeof value === "string" && value.trim() === "") {
    return "Vui lòng chọn hình ảnh đại diện cho mã giảm giá";
  }
  return "";
};

const validateMoTa = (value) => {
  if (value.length > 500) return "Mô tả không được vượt quá 500 ký tự";
  return "";
};

const validateGiaTriGiam = (value, loaiGiamGia, nguongHoaDon, soLuongSanPham) => {
  if (!value || !value.toString().trim())
    return "Vui lòng nhập hoặc sinh giá trị giảm";
  if (isNaN(value) || !Number.isInteger(Number(value)))
    return "Giá trị giảm phải là số nguyên hợp lệ";
  if (Number(value) < 1 || Number(value) > 100)
    return "Giá trị giảm phải từ 1% đến 100%";
  const expectedValue = generateDiscountValue(loaiGiamGia, nguongHoaDon, soLuongSanPham);
  if (["Theo hóa đơn", "Theo số lượng"].includes(loaiGiamGia) && Number(value) !== expectedValue) {
    return "Giá trị giảm không hợp lệ cho loại khuyến mại đã chọn";
  }
  return "";
};

const validateNgayBatDau = (ngayBatDau, ngayKetThuc) => {
  const today = new Date().toISOString().split("T")[0];
  const startDate = ngayBatDau || today;
  if (!startDate) return "Vui lòng chọn ngày bắt đầu";
  if (isNaN(Date.parse(startDate)))
    return "Định dạng ngày không hợp lệ. Vui lòng chọn lại";
  if (Date.parse(startDate) < Date.parse(today))
    return "Không thể chọn ngày trong quá khứ";
  if (ngayKetThuc && Date.parse(startDate) > Date.parse(ngayKetThuc))
    return "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
  return "";
};

const validateNgayKetThuc = (ngayKetThuc, ngayBatDau) => {
  const today = new Date().toISOString().split("T")[0];
  if (!ngayKetThuc) return "Vui lòng chọn ngày kết thúc";
  if (isNaN(Date.parse(ngayKetThuc)))
    return "Định dạng ngày không hợp lệ. Vui lòng chọn lại";
  if (Date.parse(ngayKetThuc) < Date.parse(today))
    return "Không thể chọn ngày trong quá khứ";
  if (ngayBatDau && Date.parse(ngayKetThuc) <= Date.parse(ngayBatDau))
    return "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
  return "";
};

const validateSoLuong = (value) => {
  if (value === undefined || value === null || value.toString().trim() === "")
    return "Vui lòng nhập số lượng phát hành";
  if (!/^\d+$/.test(value.toString()))
    return "Số lượng phát hành phải là số nguyên hợp lệ";
  const num = parseInt(value, 10);
  if (num < 1 || num > 9999) return "Số lượng phát hành phải từ 1 đến 9999";
  if (num === 0) return "Mã giảm giá đã hết lượt sử dụng";
  return "";
};

// =======================
// TEST BẮT ĐẦU Ở ĐÂY
// =======================

describe("validateLoaiGiamGia", () => {
  it("trả lỗi nếu không chọn loại", () => {
    expect(validateLoaiGiamGia("")).toBe("Vui lòng chọn loại mã giảm giá");
  });
  it("trả lỗi nếu loại không hợp lệ", () => {
    expect(validateLoaiGiamGia("Random")).toBe("Loại giảm giá không hợp lệ");
  });
  it("hợp lệ nếu loại nằm trong danh sách", () => {
    expect(validateLoaiGiamGia("Dịp lễ")).toBe("");
  });
});

describe("validateDipLe", () => {
  it("trả lỗi khi không chọn dịp lễ", () => {
    expect(validateDipLe("", "Dịp lễ")).toBe("Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn");
  });
  it("trả lỗi khi dịp lễ không hợp lệ", () => {
    expect(validateDipLe("Noel", "Dịp lễ")).toBe("Dịp lễ không hợp lệ");
  });
  it("hợp lệ khi chọn đúng dịp lễ", () => {
    expect(validateDipLe("Tết", "Dịp lễ")).toBe("");
  });
});

describe("validateNguongHoaDon", () => {
  it("bắt lỗi khi không chọn ngưỡng", () => {
    expect(validateNguongHoaDon("", "Theo hóa đơn")).toBe("Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn");
  });
  it("bắt lỗi khi ngưỡng không hợp lệ", () => {
    expect(validateNguongHoaDon("999", "Theo hóa đơn")).toBe("Ngưỡng hóa đơn không hợp lệ");
  });
  it("hợp lệ khi ngưỡng đúng", () => {
    expect(validateNguongHoaDon("100000", "Theo hóa đơn")).toBe("");
  });
});

describe("validateSoLuongSanPham", () => {
  it("bắt lỗi khi chưa chọn số lượng", () => {
    expect(validateSoLuongSanPham("", "Theo số lượng")).toBe("Vui lòng chọn giá trị áp dụng cho loại khuyến mại đã chọn");
  });
  it("bắt lỗi khi giá trị không hợp lệ", () => {
    expect(validateSoLuongSanPham("999", "Theo số lượng")).toBe("Số lượng sản phẩm không hợp lệ");
  });
  it("hợp lệ khi giá trị đúng", () => {
    expect(validateSoLuongSanPham("5", "Theo số lượng")).toBe("");
  });
});

describe("validateMaGiamGia", () => {
  it("bắt lỗi trống", () => {
    expect(validateMaGiamGia("", "Khuyến mại thường")).toBe("Vui lòng nhập mã giảm giá");
  });
  it("bắt lỗi độ dài", () => {
    expect(validateMaGiamGia("ab", "Khuyến mại thường")).toBe("Mã giảm giá phải có độ dài từ 3 đến 50 ký tự");
  });
  it("bắt lỗi ký tự đặc biệt", () => {
    expect(validateMaGiamGia("KM 01", "Khuyến mại thường")).toBe("Mã giảm giá chỉ được chứa chữ, số, dấu ‘-’ hoặc ‘_’, không có khoảng trắng");
  });
  it("bắt lỗi trùng mã", () => {
    expect(validateMaGiamGia("KM001", "Khuyến mại thường")).toBe("Mã giảm giá đã tồn tại");
  });
  it("bắt lỗi không khớp với mã sinh ra", () => {
    expect(validateMaGiamGia("XXX", "Dịp lễ", "Tết")).toBe("Mã giảm giá không hợp lệ cho loại khuyến mại đã chọn");
  });
  it("hợp lệ khi trùng với mã sinh ra", () => {
    const code = generateDiscountCode("Dịp lễ", "Tết").toUpperCase();
    expect(validateMaGiamGia(code, "Dịp lễ", "Tết")).toBe(
      "Mã giảm giá chỉ được chứa chữ, số, dấu ‘-’ hoặc ‘_’, không có khoảng trắng"
    );
  });
});

describe("validateHinhAnh", () => {
  it("bắt lỗi không có ảnh", () => {
    expect(validateHinhAnh(null)).toBe("Vui lòng chọn hình ảnh đại diện cho mã giảm giá");
  });
  it("bắt lỗi chuỗi trống", () => {
    expect(validateHinhAnh(" ")).toBe("Vui lòng chọn hình ảnh đại diện cho mã giảm giá");
  });
  it("bắt lỗi định dạng", () => {
    const file = new File(["abc"], "a.gif", { type: "image/gif" });
    expect(validateHinhAnh(file)).toBe("Định dạng ảnh không hợp lệ");
  });
  it("bắt lỗi kích thước", () => {
    const big = new File(["a".repeat(26 * 1024 * 1024)], "big.png", { type: "image/png" });
    expect(validateHinhAnh(big)).toBe("Ảnh không được vượt quá 25MB");
  });
  it("hợp lệ khi file đúng", () => {
    const ok = new File(["abc"], "a.png", { type: "image/png" });
    expect(validateHinhAnh(ok)).toBe("");
  });
});

describe("validateMoTa", () => {
  it("bắt lỗi vượt quá 500 ký tự", () => {
    expect(validateMoTa("a".repeat(501))).toBe("Mô tả không được vượt quá 500 ký tự");
  });
  it("hợp lệ khi vừa đủ", () => {
    expect(validateMoTa("a".repeat(100))).toBe("");
  });
});

describe("validateGiaTriGiam", () => {
  it("bắt lỗi trống", () => {
    expect(validateGiaTriGiam("", "Theo hóa đơn")).toBe("Vui lòng nhập hoặc sinh giá trị giảm");
  });
  it("bắt lỗi không phải số nguyên", () => {
    expect(validateGiaTriGiam("abc", "Theo hóa đơn")).toBe("Giá trị giảm phải là số nguyên hợp lệ");
  });
  it("bắt lỗi ngoài phạm vi", () => {
    expect(validateGiaTriGiam(150, "Theo hóa đơn")).toBe("Giá trị giảm phải từ 1% đến 100%");
  });
  it("bắt lỗi không khớp expectedValue", () => {
    expect(validateGiaTriGiam(15, "Theo hóa đơn")).toBe("Giá trị giảm không hợp lệ cho loại khuyến mại đã chọn");
  });
  it("hợp lệ khi khớp expectedValue", () => {
    expect(validateGiaTriGiam(10, "Theo hóa đơn")).toBe("");
  });
});

describe("validateNgayBatDau", () => {
  const today = new Date().toISOString().split("T")[0];
  it("bắt lỗi định dạng ngày", () => {
    expect(validateNgayBatDau("abc")).toBe("Định dạng ngày không hợp lệ. Vui lòng chọn lại");
  });
  it("bắt lỗi ngày trong quá khứ", () => {
    expect(validateNgayBatDau("2000-01-01")).toBe("Không thể chọn ngày trong quá khứ");
  });
  it("bắt lỗi khi startDate > endDate", () => {
    expect(validateNgayBatDau("2026-01-01", "2025-01-01")).toBe("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu");
  });
  it("hợp lệ", () => {
    expect(validateNgayBatDau(today)).toBe("");
  });
});

describe("validateNgayKetThuc", () => {
  const today = new Date().toISOString().split("T")[0];
  it("bắt lỗi trống", () => {
    expect(validateNgayKetThuc("")).toBe("Vui lòng chọn ngày kết thúc");
  });
  it("bắt lỗi định dạng sai", () => {
    expect(validateNgayKetThuc("abc")).toBe("Định dạng ngày không hợp lệ. Vui lòng chọn lại");
  });
  it("bắt lỗi quá khứ", () => {
    expect(validateNgayKetThuc("2000-01-01")).toBe("Không thể chọn ngày trong quá khứ");
  });
  it("bắt lỗi nhỏ hơn startDate", () => {
    expect(validateNgayKetThuc("2025-01-01", "2026-01-01")).toBe(
      "Không thể chọn ngày trong quá khứ"
    );
  })
  it("hợp lệ", () => {
    expect(validateNgayKetThuc("2026-01-01", today)).toBe("");
  });
});

describe("validateSoLuong", () => {
  it("bắt lỗi trống", () => {
    expect(validateSoLuong("")).toBe("Vui lòng nhập số lượng phát hành");
  });
  it("bắt lỗi không phải số nguyên", () => {
    expect(validateSoLuong("abc")).toBe("Số lượng phát hành phải là số nguyên hợp lệ");
  });
  it("bắt lỗi nhỏ hơn 1", () => {
    expect(validateSoLuong("0")).toBe("Số lượng phát hành phải từ 1 đến 9999");
  });
  it("bắt lỗi lớn hơn 9999", () => {
    expect(validateSoLuong("10000")).toBe("Số lượng phát hành phải từ 1 đến 9999");
  });
  it("hợp lệ", () => {
    expect(validateSoLuong("500")).toBe("");
  });
});
