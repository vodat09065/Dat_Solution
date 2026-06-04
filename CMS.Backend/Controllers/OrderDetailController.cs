using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var details = await _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .ToListAsync();
            return View(details);
        }

        public async Task<IActionResult> Create()
        {
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id"); // simple order selector
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderDetail model)
        {
            if (ModelState.IsValid)
            {
                _context.OrderDetails.Add(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", model.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", model.ProductId);
            return View(model);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail == null) return NotFound();
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", detail.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", detail.ProductId);
            return View(detail);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(OrderDetail model)
        {
            if (ModelState.IsValid)
            {
                _context.OrderDetails.Update(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.OrderList = new SelectList(_context.Orders, "Id", "Id", model.OrderId);
            ViewBag.ProductList = new SelectList(_context.Products, "Id", "Name", model.ProductId);
            return View(model);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _context.OrderDetails.FindAsync(id);
            if (detail != null)
            {
                _context.OrderDetails.Remove(detail);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
