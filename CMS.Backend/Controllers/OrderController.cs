using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .ToListAsync();
            return View(orders);
        }

        public async Task<IActionResult> Details(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (order == null) return NotFound();
            return View(order);
        }

        public IActionResult Create()
        {
            ViewBag.Customers = new SelectList(_context.Customers, "Id", "Username");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Order model)
        {
            if (ModelState.IsValid)
            {
                _context.Orders.Add(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Customers = new SelectList(_context.Customers, "Id", "Username", model.CustomerId);
            return View(model);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();
            ViewBag.Customers = new SelectList(_context.Customers, "Id", "Username", order.CustomerId);
            return View(order);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Order model)
        {
            if (ModelState.IsValid)
            {
                _context.Orders.Update(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewBag.Customers = new SelectList(_context.Customers, "Id", "Username", model.CustomerId);
            return View(model);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
