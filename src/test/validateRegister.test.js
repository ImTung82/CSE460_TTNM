import { describe, it, expect } from 'vitest';

const validateUsername = (value) => {
    if (!value.trim())
        return 'Tên người dùng không được để trống.';
    if (value.length > 50)
        return 'Tên người dùng không vượt quá 50 ký tự.';
    return '';
};

const validatePassword = (value) => {
    if (!value.trim())
        return 'Mật khẩu không được để trống.';
    else if (value.length < 8)
        return 'Mật khẩu phải có ít nhất 8 ký tự.';
    return '';
};

const validateEmail = (value) => {
    if (!value.trim())
        return 'Email không được để trống.';
    else if (value.length > 150)
        return 'Email không được vượt quá 150 ký tự.';
    else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value))
        return 'Email không hợp lệ.';
    return '';
};

const validatePhone = (value) => {
    if (!value.trim())
        return 'Số điện thoại không được để trống.';
    else if (!/^0\d{9}$/.test(value))
        return 'Số điện thoại phải đủ 10 số và bắt đầu bằng số 0.';
    return '';
};

const validateAddress = (value) => {
    if (!value.trim())
        return 'Địa chỉ không được để trống.';
    else if (value.length > 150)
        return 'Địa chỉ không vượt quá 150 ký tự.';
    return '';
};

describe('Register Validation Functions', () => {
    describe('validateUsername', () => {
        it('Thất bại do tên người dùng bỏ trống', () => {
            expect(validateUsername('')).toBe('Tên người dùng không được để trống.');
        });
        it('Thất bại do tên người dùng dài hơn 50 ký tự', () => {
            expect(validateUsername('a'.repeat(51))).toBe('Tên người dùng không vượt quá 50 ký tự.');
        });
        it('Thành công', () => {
            expect(validateUsername('iamtog')).toBe('');
        });
    });

    describe('validatePassword', () => {
        it('Thất bại do mật khẩu bỏ trống', () => {
            expect(validatePassword('')).toBe('Mật khẩu không được để trống.');
        });
        it('Thất bại do mật khẩu ngắn hơn 8 ký tự', () => {
            expect(validatePassword('1234567')).toBe('Mật khẩu phải có ít nhất 8 ký tự.');
        });
        it('Thành công', () => {
            expect(validatePassword('12345678')).toBe('');
        });
    });

    describe('validateEmail', () => {
        it('Thất bại do email bỏ trống', () => {
            expect(validateEmail('')).toBe('Email không được để trống.');
        });
        it('Thất bại do email dài hơn 150 ký tự', () => {
            expect(validateEmail('a'.repeat(151) + '@gmail.com')).toBe('Email không được vượt quá 150 ký tự.');
        });
        it('Thất bại do email không hợp lệ', () => {
            expect(validateEmail('a@gmail')).toBe('Email không hợp lệ.');
        });
        it('Thành công', () => {
            expect(validateEmail('a@gmail.com')).toBe('');
        });
    });

    describe('validatePhone', () => {
        it('Thất bại do số điện thoại bỏ trống', () => {
            expect(validatePhone('')).toBe('Số điện thoại không được để trống.');
        });
        it('Thất bại do số điện thoại không đúng định dạng', () => {
            expect(validatePhone('123456789')).toBe('Số điện thoại phải đủ 10 số và bắt đầu bằng số 0.');
            expect(validatePhone('1123456789')).toBe('Số điện thoại phải đủ 10 số và bắt đầu bằng số 0.');
            expect(validatePhone('abc')).toBe('Số điện thoại phải đủ 10 số và bắt đầu bằng số 0.');
        });
        it('Thành công', () => {
            expect(validatePhone('0912345678')).toBe('');
        });
    });

    describe('validateAddress', () => {
        it('Thất bại do địa chỉ bỏ trống', () => {
            expect(validateAddress('')).toBe('Địa chỉ không được để trống.');
        });
        it('Thất bại do địa chỉ dài hơn 150 ký tự', () => {
            expect(validateAddress('a'.repeat(151))).toBe('Địa chỉ không vượt quá 150 ký tự.');
        });
        it('Thành công', () => {
            expect(validateAddress('HN')).toBe('');
        });
    });
});
