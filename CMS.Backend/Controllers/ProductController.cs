using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var products = await _context.Products.Include(p => p.CategoryProduct).ThenInclude(cp => cp.Category).ToListAsync();
            return View(products);
        }

        public IActionResult Create()
        {
            ViewBag.CategoryProductList = new SelectList(_context.CategoryProducts.Include(cp => cp.Category), "Id", "Category.Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Product model, IFormFile? uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                var filePath = Path.Combine(folder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await uploadImage.CopyToAsync(stream);
                model.ImageUrl = "/uploads/" + fileName;
            }
            _context.Products.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            ViewBag.CategoryProductList = new SelectList(_context.CategoryProducts.Include(cp => cp.Category), "Id", "Category.Name", product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Product model, IFormFile? uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                var filePath = Path.Combine(folder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await uploadImage.CopyToAsync(stream);
                model.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                var old = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == model.Id);
                if (old != null && string.IsNullOrEmpty(model.ImageUrl)) model.ImageUrl = old.ImageUrl;
            }
            _context.Products.Update(model);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
