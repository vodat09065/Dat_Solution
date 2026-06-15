using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CategoryProductController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> Index()
            => View(await _context.CategoryProducts.Include(cp => cp.Category).ToListAsync());

        public async Task<IActionResult> Create()
        {
            ViewBag.CategoryList = new SelectList(await _context.Categories.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryProduct model, IFormFile? imageFile)
        {
            if (ModelState.IsValid)
            {
                // Xử lý upload ảnh
                if (imageFile != null && imageFile.Length > 0)
                {
                    model.ImageUrl = await SaveImage(imageFile);
                }

                _context.CategoryProducts.Add(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.CategoryList = new SelectList(await _context.Categories.ToListAsync(), "Id", "Name", model.CategoryId);
            return View(model);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var cp = await _context.CategoryProducts.FindAsync(id);
            if (cp == null) return NotFound();
            ViewBag.CategoryList = new SelectList(await _context.Categories.ToListAsync(), "Id", "Name", cp.CategoryId);
            return View(cp);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, CategoryProduct model, IFormFile? imageFile)
        {
            if (id != model.Id) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    // Lấy thông tin cũ để xử lý ảnh
                    var existing = await _context.CategoryProducts.AsNoTracking().FirstOrDefaultAsync(cp => cp.Id == id);

                    // Xử lý upload ảnh mới
                    if (imageFile != null && imageFile.Length > 0)
                    {
                        // Xóa ảnh cũ nếu có
                        if (!string.IsNullOrEmpty(existing?.ImageUrl))
                        {
                            DeleteOldImage(existing.ImageUrl);
                        }
                        model.ImageUrl = await SaveImage(imageFile);
                    }
                    else
                    {
                        // Giữ nguyên ảnh cũ
                        model.ImageUrl = existing?.ImageUrl;
                    }

                    _context.CategoryProducts.Update(model);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CategoryProductExists(model.Id)) return NotFound();
                    else throw;
                }
                return RedirectToAction(nameof(Index));
            }
            ViewBag.CategoryList = new SelectList(await _context.Categories.ToListAsync(), "Id", "Name", model.CategoryId);
            return View(model);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var cp = await _context.CategoryProducts.FindAsync(id);
            if (cp == null) return NotFound();
            return View(cp);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cp = await _context.CategoryProducts.FindAsync(id);
            if (cp != null)
            {
                // Xóa file ảnh khi xóa danh mục
                if (!string.IsNullOrEmpty(cp.ImageUrl))
                {
                    DeleteOldImage(cp.ImageUrl);
                }
                _context.CategoryProducts.Remove(cp);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool CategoryProductExists(int id)
        {
            return _context.CategoryProducts.Any(e => e.Id == id);
        }

        // Hàm lưu ảnh
        private async Task<string> SaveImage(IFormFile imageFile)
        {
            // Tạo thư mục uploads/categoryproducts nếu chưa tồn tại
            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "categoryproducts");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Tạo tên file duy nhất để tránh trùng
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Lưu file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            // Trả về đường dẫn tương đối để lưu vào database
            return "/uploads/categoryproducts/" + uniqueFileName;
        }

        // Hàm xóa ảnh cũ
        private void DeleteOldImage(string imageUrl)
        {
            if (!string.IsNullOrEmpty(imageUrl))
            {
                var oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, imageUrl.TrimStart('/'));
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }
        }
    }
}