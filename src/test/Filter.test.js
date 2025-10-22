import { describe, it, expect } from "vitest";

// ======================
// 🧩 HÀM 1: Lọc theo tên sách
// ======================
const filterBooksByName = (searchQuery, initialBooks) => {
  let error = "";
  let filteredBooks = [...initialBooks];

  if (searchQuery) {
    if (!searchQuery.trim() || searchQuery.trim() === "") {
      error = "Tên sách không được để trống";
    } else if (searchQuery.length > 225) {
      error = "Tên sách không được vượt quá 225 ký tự";
    } else {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredBooks.length === 0) {
        error = "Không tìm thấy sách phù hợp";
      }
    }
  } else {
    error = "Tên sách không được để trống";
  }

  return { error, filteredBooks };
};

// ======================
// 🧩 HÀM 2: Lọc theo danh mục
// ======================
const filterBooksByCategory = (categoryKey, booksData, categories) => {
  let error = "";
  let filteredBooks = [];

  if (categoryKey) {
    const categoryObj = categories.find((cat) => cat.key === categoryKey);
    if (!categoryObj) {
      error = "Danh mục không hợp lệ";
    } else {
      filteredBooks = booksData.filter(
        (book) =>
          book.category &&
          book.category.toLowerCase().replace(/\//g, "-") === categoryKey
      );
    }
  } else {
    filteredBooks = [...booksData];
  }

  return { error, filteredBooks };
};

// ======================
// ✅ TEST HÀM 1: filterBooksByName
// ======================
describe("filterBooksByName", () => {
  const books = [
    { title: "Lập trình Java" },
    { title: "Cấu trúc dữ liệu" },
    { title: "Học máy cơ bản" },
  ];

  it("bắt lỗi khi searchQuery là chuỗi rỗng", () => {
    const { error } = filterBooksByName("", books);
    expect(error).toBe("Tên sách không được để trống");
  });

  it("bắt lỗi khi searchQuery chỉ có khoảng trắng", () => {
    const { error } = filterBooksByName("   ", books);
    expect(error).toBe("Tên sách không được để trống");
  });

  it("bắt lỗi khi searchQuery vượt quá 225 ký tự", () => {
    const longQuery = "a".repeat(226);
    const { error } = filterBooksByName(longQuery, books);
    expect(error).toBe("Tên sách không được vượt quá 225 ký tự");
  });

  it("trả về danh sách phù hợp khi tìm thấy", () => {
    const { error, filteredBooks } = filterBooksByName("Java", books);
    expect(error).toBe("");
    expect(filteredBooks).toEqual([{ title: "Lập trình Java" }]);
  });

  it("bắt lỗi khi không tìm thấy sách phù hợp", () => {
    const { error, filteredBooks } = filterBooksByName("Python", books);
    expect(error).toBe("Không tìm thấy sách phù hợp");
    expect(filteredBooks).toEqual([]);
  });

  it("phân biệt chữ hoa – thường đúng cách", () => {
    const { error, filteredBooks } = filterBooksByName("CẤU TRÚC", books);
    expect(error).toBe("");
    expect(filteredBooks).toEqual([{ title: "Cấu trúc dữ liệu" }]);
  });
});

// ======================
// ✅ TEST HÀM 2: filterBooksByCategory
// ======================
describe("filterBooksByCategory", () => {
  const categories = [
    { key: "lap-trinh", name: "Lập trình" },
    { key: "ai", name: "Trí tuệ nhân tạo" },
  ];

  const booksData = [
    { title: "Java cơ bản", category: "lap-trinh" },
    { title: "Deep Learning", category: "ai" },
    { title: "Không có danh mục" },
  ];

  it("trả về toàn bộ sách khi không có categoryKey", () => {
    const { error, filteredBooks } = filterBooksByCategory("", booksData, categories);
    expect(error).toBe("");
    expect(filteredBooks).toEqual(booksData);
  });

  it("bắt lỗi khi categoryKey không tồn tại trong danh mục", () => {
    const { error, filteredBooks } = filterBooksByCategory("khong-ton-tai", booksData, categories);
    expect(error).toBe("Danh mục không hợp lệ");
    expect(filteredBooks).toEqual([]);
  });

  it("lọc đúng sách khi categoryKey hợp lệ", () => {
    const { error, filteredBooks } = filterBooksByCategory("ai", booksData, categories);
    expect(error).toBe("");
    expect(filteredBooks).toEqual([{ title: "Deep Learning", category: "ai" }]);
  });

  it("xử lý đúng khi sách không có trường category", () => {
    const { error, filteredBooks } = filterBooksByCategory("lap-trinh", booksData, categories);
    expect(error).toBe("");
    expect(filteredBooks).toEqual([{ title: "Java cơ bản", category: "lap-trinh" }]);
  });
});
