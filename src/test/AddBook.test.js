import { describe, it, expect } from 'vitest';

// Extract các hàm validate từ AddBook component để test
const validateTenSach = (value) => {
    if (!value.trim())
        return "Tên đầu sách không được bỏ trống";
    else if (value.length > 250)
        return "Tên đầu sách không được vượt quá 250 ký tự";
    return "";
};

const validateHinhAnh = (value) => {
    if (!value)
        return "Vui lòng tải lên hình ảnh cho đầu sách";
    else if (value.type !== "image/jpeg" && value.type !== "image/jpg" && value.type !== "image/png" && value.type !== "image/svg+xml")
        return "Định dạng ảnh không hợp lệ.";
    else if (value.size > 25 * 1024 * 1024)
        return "Kích thước ảnh không được vượt quá 25MB";
    return "";
};

const validateMoTa = (value) => {
    if (!value.trim())
        return "Mô tả không được bỏ trống";
    else if (value.length > 2000)
        return "Mô tả tổng quan không được vượt quá 2000 ký tự";
    return "";
};

const validateTenNhaXuatBan = (value) => {
    if (!value.trim()) 
        return "Tên nhà xuất bản không được bỏ trống";
    else if (value.length > 250)
        return "Tên nhà xuất bản không được vượt quá 250 ký tự";
    return "";
};

const validateNamXuatBan = (value) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
        return "Năm xuất bản chỉ được nhập số";
    else if (!Number.isInteger(Number(value)))
        return "Năm xuất bản phải là số nguyên";
    else if (Number(value) <= 0)
        return "Năm xuất bản phải lớn hơn 0";
    return "";
};

const validateTacGia = (value) => {
    if (!value.trim())
        return "Tác giả không được bỏ trống";
    else if (value.length > 250)
        return "Tác giả không được vượt quá 250 ký tự";
    return "";
};

const validateNguoiDich = (value) => {
    if (!value.trim())
        return "Người dịch không được bỏ trống";
    else if (value.length > 250)
        return "Người dịch không được vượt quá 250 ký tự";
    return "";
};

const validateNgonNgu = (value) => {
    if (value === "-- Chọn ngôn ngữ --")
        return "Vui lòng chọn ngôn ngữ của sách";
    return "";
};

const validateTrongLuong = (value) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
        return "Trọng lượng chỉ được nhập số";
    else if (!Number.isInteger(Number(value)))
        return "Trọng lượng phải là số nguyên";
    else if (Number(value) <= 0)
        return "Trọng lượng phải lớn hơn 0";
    return "";
};

const validateSoTrang = (value) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
        return "Số trang chỉ được nhập số";
    else if (!Number.isInteger(Number(value)))
        return "Số trang phải là số nguyên";
    else if (Number(value) <= 0)
        return "Số trang phải lớn hơn 0";
    return "";
};

const validateHinhThuc = (value) => {
    if (value === "-- Chọn hình thức --")
        return "Vui lòng chọn hình thức của sách";
    return "";
};

const validateTheLoai = (value) => {
    if (value.length === 0)
        return "Vui lòng chọn thể loại cho sách";
    return "";
};

const validateGiaGoc = (value) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
        return "Giá gốc chỉ được nhập số";
    else if (!Number.isInteger(Number(value)))
        return "Giá gốc phải là số nguyên";
    else if (Number(value) <= 0)
        return "Giá gốc phải lớn hơn 0";
    return "";
};

const validateKhuyenMai = (value) => {
    if (!/^-?\d+(\.\d+)?$/.test(value.trim()))
        return "Khuyến mãi chỉ được nhập số";
    else if (parseFloat(value) < 0 || parseFloat(value) > 100)
        return "Khuyến mãi phải nằm trong khoảng từ 0 đến 100";
    return "";
};

describe('AddBook Validation Functions', () => {
    describe('validateTenSach', () => {
        it('Thất bại do tên sách bỏ trống', () => {
            expect(validateTenSach('')).toBe('Tên đầu sách không được bỏ trống');
        });

        it('Thất bại do chuỗi dài hơn 250 ký tự', () => {
            const longString = 'a'.repeat(251);
            expect(validateTenSach(longString)).toBe('Tên đầu sách không được vượt quá 250 ký tự');
        });

        it('Thành công', () => {
            expect(validateTenSach('Conan')).toBe('');
            expect(validateTenSach('a'.repeat(250))).toBe('');
        });
    });

    describe('validateHinhAnh', () => {
        it('Thất bại do hình ảnh null/undefined', () => {
            expect(validateHinhAnh(null)).toBe('Vui lòng tải lên hình ảnh cho đầu sách');
            expect(validateHinhAnh(undefined)).toBe('Vui lòng tải lên hình ảnh cho đầu sách');
        });

        it('Thất bại do định dạng file không hợp lệ', () => {
            const invalidFile = { type: 'application/pdf', size: 1024 };
            expect(validateHinhAnh(invalidFile)).toBe('Định dạng ảnh không hợp lệ.');
        });

        it('Thất bại do kích thước file vượt quá 25MB', () => {
            const largeFile = { type: 'image/jpeg', size: 26 * 1024 * 1024 };
            expect(validateHinhAnh(largeFile)).toBe('Kích thước ảnh không được vượt quá 25MB');
        });

        it('Thành công', () => {
            const jpgFile = { type: 'image/jpg', size: 1024 * 1024 };
            expect(validateHinhAnh(jpgFile)).toBe('');

            const jpegFile = { type: 'image/jpeg', size: 1024 * 1024 };
            expect(validateHinhAnh(jpegFile)).toBe('');
            
            const pngFile = { type: 'image/png', size: 2 * 1024 * 1024 };
            expect(validateHinhAnh(pngFile)).toBe('');
            
            const svgFile = { type: 'image/svg+xml', size: 500 * 1024 };
            expect(validateHinhAnh(svgFile)).toBe('');
        });
    });

    describe('validateMoTa', () => {
        it('Thất bại do mô tả bỏ trống', () => {
            expect(validateMoTa('')).toBe('Mô tả không được bỏ trống');
            expect(validateMoTa('   ')).toBe('Mô tả không được bỏ trống');
        });

        it('Thất bại do mô tả dài hơn 2000 ký tự', () => {
            const longString = 'a'.repeat(2001);
            expect(validateMoTa(longString)).toBe('Mô tả tổng quan không được vượt quá 2000 ký tự');
        });

        it('Thành công', () => {
            expect(validateMoTa('Mô tả hợp lệ')).toBe('');
            expect(validateMoTa('a'.repeat(2000))).toBe('');
        });
    });

    describe('validateTenNhaXuatBan', () => {
        it('Thất bại do tên nhà xuất bản bỏ trống', () => {
            expect(validateTenNhaXuatBan('')).toBe('Tên nhà xuất bản không được bỏ trống');
            expect(validateTenNhaXuatBan('   ')).toBe('Tên nhà xuất bản không được bỏ trống');
        });

        it('Thất bại do tên nhà xuất bản dài hơn 250 ký tự', () => {
            const longString = 'a'.repeat(251);
            expect(validateTenNhaXuatBan(longString)).toBe('Tên nhà xuất bản không được vượt quá 250 ký tự');
        });

        it('Thành công', () => {
            expect(validateTenNhaXuatBan('NXB Kim Đồng')).toBe('');
        });
    });

    describe('validateNamXuatBan', () => {
        it('Thất bại do năm xuất bản không phải số', () => {
            expect(validateNamXuatBan('abc')).toBe('Năm xuất bản chỉ được nhập số');
            expect(validateNamXuatBan('2023abc')).toBe('Năm xuất bản chỉ được nhập số');
        });

        it('Thất bại do năm xuất bản không phải số nguyên', () => {
            expect(validateNamXuatBan('2023.5')).toBe('Năm xuất bản phải là số nguyên');
        });

        it('Thất bại do năm xuất bản bằng 0 hoặc âm', () => {
            expect(validateNamXuatBan('0')).toBe('Năm xuất bản phải lớn hơn 0');
            expect(validateNamXuatBan('-2023')).toBe('Năm xuất bản phải lớn hơn 0');
        });

        it('Thành công', () => {
            expect(validateNamXuatBan('2023')).toBe('');
            expect(validateNamXuatBan('1999')).toBe('');
        });
    });

    describe('validateTacGia', () => {
        it('Thất bại do tác giả bỏ trống', () => {
            expect(validateTacGia('')).toBe('Tác giả không được bỏ trống');
            expect(validateTacGia('   ')).toBe('Tác giả không được bỏ trống');
        });

        it('Thất bại do tác giả dài hơn 250 ký tự', () => {
            const longString = 'a'.repeat(251);
            expect(validateTacGia(longString)).toBe('Tác giả không được vượt quá 250 ký tự');
        });

        it('Thành công', () => {
            expect(validateTacGia('Nguyễn Nhật Ánh')).toBe('');
        });
    });

    describe('validateNguoiDich', () => {
        it('Thất bại do người dịch bỏ trống', () => {
            expect(validateNguoiDich('')).toBe('Người dịch không được bỏ trống');
            expect(validateNguoiDich('   ')).toBe('Người dịch không được bỏ trống');
        });

        it('Thất bại do người dịch dài hơn 250 ký tự', () => {
            const longString = 'a'.repeat(251);
            expect(validateNguoiDich(longString)).toBe('Người dịch không được vượt quá 250 ký tự');
        });

        it('Thành công', () => {
            expect(validateNguoiDich('Trần Văn A')).toBe('');
        });
    });

    describe('validateNgonNgu', () => {
        it('Thất bại do chưa chọn ngôn ngữ', () => {
            expect(validateNgonNgu('-- Chọn ngôn ngữ --')).toBe('Vui lòng chọn ngôn ngữ của sách');
        });

        it('Thành công', () => {
            expect(validateNgonNgu('Tiếng Việt')).toBe('');
            expect(validateNgonNgu('Tiếng Anh')).toBe('');
            expect(validateNgonNgu('Tiếng Nhật')).toBe('');
        });
    });

    describe('validateTrongLuong', () => {
        it('Thất bại do trọng lượng không phải số', () => {
            expect(validateTrongLuong('abc')).toBe('Trọng lượng chỉ được nhập số');
        });

        it('Thất bại do trọng lượng không phải số nguyên', () => {
            expect(validateTrongLuong('100.5')).toBe('Trọng lượng phải là số nguyên');
        });

        it('Thất bại do trọng lượng bằng 0 hoặc âm', () => {
            expect(validateTrongLuong('0')).toBe('Trọng lượng phải lớn hơn 0');
            expect(validateTrongLuong('-100')).toBe('Trọng lượng phải lớn hơn 0');
        });

        it('Thành công', () => {
            expect(validateTrongLuong('500')).toBe('');
            expect(validateTrongLuong('1000')).toBe('');
        });
    });

    describe('validateSoTrang', () => {
        it('Thất bại do số trang không phải số', () => {
            expect(validateSoTrang('abc')).toBe('Số trang chỉ được nhập số');
        });

        it('Thất bại do số trang không phải số nguyên', () => {
            expect(validateSoTrang('100.5')).toBe('Số trang phải là số nguyên');
        });

        it('Thất bại do số trang bằng 0 hoặc âm', () => {
            expect(validateSoTrang('0')).toBe('Số trang phải lớn hơn 0');
            expect(validateSoTrang('-100')).toBe('Số trang phải lớn hơn 0');
        });

        it('Thành công', () => {
            expect(validateSoTrang('200')).toBe('');
            expect(validateSoTrang('500')).toBe('');
        });
    });

    describe('validateHinhThuc', () => {
        it('Thất bại do chưa chọn hình thức', () => {
            expect(validateHinhThuc('-- Chọn hình thức --')).toBe('Vui lòng chọn hình thức của sách');
        });

        it('Thành công', () => {
            expect(validateHinhThuc('Bìa cứng')).toBe('');
            expect(validateHinhThuc('Bìa mềm')).toBe('');
        });
    });

    describe('validateTheLoai', () => {
        it('Thất bại do chưa chọn thể loại', () => {
            expect(validateTheLoai([])).toBe('Vui lòng chọn thể loại cho sách');
        });

        it('Thành công', () => {
            expect(validateTheLoai(['Tiểu thuyết'])).toBe('');
            expect(validateTheLoai(['Tiểu thuyết', 'Khoa học'])).toBe('');
        });
    });

    describe('validateGiaGoc', () => {
        it('Thất bại do giá gốc không phải số', () => {
            expect(validateGiaGoc('abc')).toBe('Giá gốc chỉ được nhập số');
        });

        it('Thất bại do giá gốc không phải số nguyên', () => {
            expect(validateGiaGoc('100.5')).toBe('Giá gốc phải là số nguyên');
        });

        it('Thất bại do giá gốc bằng 0 hoặc âm', () => {
            expect(validateGiaGoc('0')).toBe('Giá gốc phải lớn hơn 0');
            expect(validateGiaGoc('-100')).toBe('Giá gốc phải lớn hơn 0');
        });

        it('Thành công', () => {
            expect(validateGiaGoc('100000')).toBe('');
            expect(validateGiaGoc('50000')).toBe('');
        });
    });

    describe('validateKhuyenMai', () => {
        it('Thất bại do khuyến mãi không phải số', () => {
            expect(validateKhuyenMai('abc')).toBe('Khuyến mãi chỉ được nhập số');
        });

        it('Thất bại do khuyến mãi ngoài khoảng 0-100', () => {
            expect(validateKhuyenMai('-5')).toBe('Khuyến mãi phải nằm trong khoảng từ 0 đến 100');
            expect(validateKhuyenMai('105')).toBe('Khuyến mãi phải nằm trong khoảng từ 0 đến 100');
        });

        it('Thành công', () => {
            expect(validateKhuyenMai('0')).toBe('');
            expect(validateKhuyenMai('50')).toBe('');
            expect(validateKhuyenMai('100')).toBe('');
            expect(validateKhuyenMai('25.5')).toBe('');
        });
    });
});
