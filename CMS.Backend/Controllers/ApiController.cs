using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        #region 1. Nhóm API hiển thị nội dung Trang Chủ & Bài viết

        // GET: /api/CategoriesProducts
        [HttpGet("CategoriesProducts")]
        public async Task<IActionResult> GetCategoriesProducts()
        {
            var list = await _context.CategoryProducts
                .Select(cp => new
                {
                    cp.Id,
                    cp.Name,
                    cp.Description,
                    cp.CategoryId
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Posts
        [HttpGet("Posts")]
        public async Task<IActionResult> GetPosts()
        {
            var list = await _context.Posts
                .OrderByDescending(p => p.CreatedDate)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate,
                    p.CategoryId
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Posts/{id}
        [HttpGet("Posts/{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _context.Posts
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate,
                    p.CategoryId
                })
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết" });
            }

            return Ok(post);
        }

        #endregion

        #region 2. Nhóm API phục vụ Trang Cửa Hàng & Chi Tiết Sản Phẩm

        // GET: /api/Products
        [HttpGet("Products")]
        public async Task<IActionResult> GetProducts()
        {
            var list = await _context.Products
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Products/category/{categoryProductId}
        [HttpGet("Products/category/{categoryProductId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryProductId)
        {
            var list = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Products/{id}
        [HttpGet("Products/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Description,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm" });
            }

            return Ok(product);
        }

        #endregion

        #region 3. Nhóm API Tài khoản Khách hàng

        public class RegisterRequest
        {
            public string FullName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
        }

        // POST: /api/Auth/CustomerRegister
        [HttpPost("Auth/CustomerRegister")]
        public async Task<IActionResult> CustomerRegister([FromBody] RegisterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Thông tin đăng ký không hợp lệ" });
            }

            var checkExist = await _context.Customers.AnyAsync(c => c.Email.ToLower() == request.Email.ToLower());
            if (checkExist)
            {
                return BadRequest(new { message = "Email này đã được sử dụng" });
            }

            var customer = new Customer
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password, // Lưu thô tối giản theo yêu cầu
                Phone = request.Phone,
                Address = request.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký tài khoản thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email
            });
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        // POST: /api/Auth/CustomerLogin
        [HttpPost("Auth/CustomerLogin")]
        public async Task<IActionResult> CustomerLogin([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email và mật khẩu không được để trống" });
            }

            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email.ToLower() == request.Email.ToLower() && c.Password == request.Password);

            if (customer == null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không chính xác" });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                token = "fake-jwt-token-for-customer-" + customer.Id
            });
        }

        #endregion

        #region 4. Nhóm API Xử lý Luồng Đặt Hàng

        public class CartItemDto
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }

        public class OrderRequest
        {
            public int CustomerId { get; set; }
            public string Notes { get; set; }
            public List<CartItemDto> CartItems { get; set; }
        }

        // POST: /api/Orders
        [HttpPost("Orders")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            if (request == null || request.CustomerId <= 0 || request.CartItems == null || !request.CartItems.Any())
            {
                return BadRequest(new { message = "Thông tin đặt hàng không hợp lệ" });
            }

            // Kiểm tra khách hàng tồn tại
            var customerExist = await _context.Customers.AnyAsync(c => c.Id == request.CustomerId);
            if (!customerExist)
            {
                return BadRequest(new { message = "Khách hàng không tồn tại" });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1. Tạo đơn hàng mới
                var order = new Order
                {
                    CustomerId = request.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0, // 0 - Chờ duyệt
                    Notes = request.Notes
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync(); // Lưu để sinh OrderId

                // 2. Duyệt qua giỏ hàng và thêm chi tiết đơn
                foreach (var item in request.CartItems)
                {
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest(new { message = $"Sản phẩm có ID {item.ProductId} không tồn tại" });
                    }

                    // Kiểm tra và khấu trừ tồn kho
                    if (product.StockQuantity < item.Quantity)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ hàng tồn kho (Còn lại: {product.StockQuantity})" });
                    }

                    // Trừ tồn kho
                    product.StockQuantity -= item.Quantity;
                    _context.Products.Update(product);

                    // Thêm chi tiết đơn hàng (lấy đúng giá Price của sản phẩm hiện tại)
                    var orderDetail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };
                    _context.OrderDetails.Add(orderDetail);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    message = "Đặt hàng thành công",
                    orderId = order.Id
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Đã xảy ra lỗi trong quá trình đặt hàng", error = ex.Message });
            }
        }

        // GET: /api/Orders/customer/{customerId}
        [HttpGet("Orders/customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomer(int customerId)
        {
            var orders = await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    OrderDetails = o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : "Sản phẩm",
                        ProductImageUrl = od.Product != null ? od.Product.ImageUrl : "",
                        od.Quantity,
                        od.UnitPrice,
                        TotalPrice = od.Quantity * od.UnitPrice
                    }).ToList(),
                    TotalOrderAmount = o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice)
                })
                .ToListAsync();

            return Ok(orders);
        }

        #endregion
    }
}
