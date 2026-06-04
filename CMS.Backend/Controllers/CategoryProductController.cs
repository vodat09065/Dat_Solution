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
        public CategoryProductController(ApplicationDbContext context) => _context = context;

        public async Task<IActionResult> Index()
            => View(await _context.CategoryProducts.Include(cp => cp.Category).ToListAsync());

        public async Task<IActionResult> Create()
        {
            ViewBag.CategoryList = new SelectList(await _context.Categories.ToListAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
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
        public async Task<IActionResult> Edit(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
                _context.CategoryProducts.Update(model);
                await _context.SaveChangesAsync();
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
                _context.CategoryProducts.Remove(cp);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
