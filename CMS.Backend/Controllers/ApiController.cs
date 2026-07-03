using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

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
                    cp.CategoryId,
                    cp.ImageUrl
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

        // GET: /api/Posts/Banners
        [HttpGet("Posts/Banners")]
        public async Task<IActionResult> GetBanners()
        {
            var list = await _context.Posts
                .OrderByDescending(p => p.CreatedDate)
                .Take(3)
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
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(lowerSearch) || p.Description.ToLower().Contains(lowerSearch))
                             .OrderByDescending(p => p.Name.ToLower().StartsWith(lowerSearch))
                             .ThenByDescending(p => p.Name.ToLower().Contains(lowerSearch))
                             .ThenBy(p => p.Name);
            }
            else 
            {
                query = query.OrderBy(p => p.Name);
            }

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            var list = await query
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
                })
                .ToListAsync();
            return Ok(list);
        }

        [HttpGet("Banners")]
        public async Task<IActionResult> GetActiveBanners()
        {
            var list = await _context.Banners
                .Where(b => b.IsActive)
                .OrderBy(b => b.SortOrder)
                .Select(b => new
                {
                    b.Id,
                    b.Title,
                    b.Description,
                    b.ImageUrl,
                    b.TargetUrl
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Products/Featured
        [HttpGet("Products/Featured")]
        public async Task<IActionResult> GetFeaturedProducts()
        {
            var list = await _context.Products
                .OrderByDescending(p => p.UpdatedDate ?? p.CreatedDate)
                .Take(8)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Products/New
        [HttpGet("Products/New")]
        public async Task<IActionResult> GetNewProducts()
        {
            var list = await _context.Products
                .OrderByDescending(p => p.CreatedDate)
                .Take(3)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
                })
                .ToListAsync();
            return Ok(list);
        }

        // GET: /api/Products/Hot
        [HttpGet("Products/Hot")]
        public async Task<IActionResult> GetHotProducts()
        {
            // Tạm thời lấy sản phẩm ngẫu nhiên hoặc theo giá (nếu chưa có thuộc tính lượt mua)
            var list = await _context.Products
                .OrderByDescending(p => p.Price) // Tạm lấy theo giá cao nhất làm hot
                .Take(3)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
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
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
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
                    p.CategoryProductId,
                    p.CreatedDate,
                    p.UpdatedDate
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

        public class ForgotPasswordRequest
        {
            public string Email { get; set; }
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
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password), // Băm mật khẩu
                Phone = request.Phone,
                Address = request.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký tài khoản thành công",
                customerId = customer.Id
            });
        }

        // POST: /api/Auth/ForgotPassword
        [HttpPost("Auth/ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { message = "Vui lòng nhập Email" });
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email.ToLower() == request.Email.ToLower());
            if (customer == null)
            {
                return BadRequest(new { message = "Không tìm thấy tài khoản với Email này" });
            }

            // Sinh mật khẩu ngẫu nhiên 6 ký tự
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var newPassword = new string(Enumerable.Repeat(chars, 6)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            // Lưu vào CSDL
            customer.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            // Gửi email
            try
            {
                var smtpClient = new System.Net.Mail.SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new System.Net.NetworkCredential("datthanh12ab@gmail.com", "jpcj ugne ojvl mpyn"),
                    EnableSsl = true,
                };

                var mailMessage = new System.Net.Mail.MailMessage
                {
                    From = new System.Net.Mail.MailAddress("datthanh12ab@gmail.com"),
                    Subject = "Cấp lại mật khẩu - DatCMS Shop",
                    Body = $@"
                        <h3>Chào {customer.FullName},</h3>
                        <p>Hệ thống đã cấp lại mật khẩu cho tài khoản của bạn.</p>
                        <p>Mật khẩu mới của bạn là: <strong>{newPassword}</strong></p>
                        <p>Vui lòng đăng nhập và đổi mật khẩu mới để đảm bảo an toàn.</p>
                        <br/>
                        <p>Cảm ơn bạn đã đồng hành cùng DatCMS Shop!</p>
                    ",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(customer.Email);
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                // Nếu gửi email lỗi, vẫn báo thành công việc cấp mới nhưng cảnh báo
                return Ok(new { message = $"Đã cấp lại mật khẩu thành công nhưng gửi email thất bại: {ex.Message}", newPassword });
            }

            return Ok(new { message = "Mật khẩu mới đã được gửi vào email của bạn. Vui lòng kiểm tra hộp thư." });
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
                .FirstOrDefaultAsync(c => c.Email.ToLower() == request.Email.ToLower());

            if (customer == null || !BCrypt.Net.BCrypt.Verify(request.Password, customer.Password))
            {
                // Fallback cho tài khoản cũ chưa băm mật khẩu
                if (customer != null && customer.Password == request.Password)
                {
                    // Nâng cấp mật khẩu: Băm lại mật khẩu thô và lưu xuống DB
                    customer.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
                    _context.Customers.Update(customer);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest(new { message = "Email hoặc mật khẩu không chính xác" });
                }
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address,
                token = "fake-jwt-token-for-customer-" + customer.Id
            });
        }

        public class UpdateProfileRequest
        {
            public int CustomerId { get; set; }
            public string FullName { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
        }

        // PUT: /api/Auth/CustomerUpdate
        [HttpPut("Auth/CustomerUpdate")]
        public async Task<IActionResult> CustomerUpdate([FromBody] UpdateProfileRequest request)
        {
            if (request == null || request.CustomerId <= 0)
            {
                return BadRequest(new { message = "Thông tin không hợp lệ" });
            }

            var customer = await _context.Customers.FindAsync(request.CustomerId);
            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng" });
            }

            customer.FullName = request.FullName;
            customer.Phone = request.Phone;
            customer.Address = request.Address;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cập nhật thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
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

            // Lấy thông tin khách hàng
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == request.CustomerId);
            if (customer == null)
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

                // Bắt đầu gửi email xác nhận
                try
                {
                    await SendOrderConfirmationEmailAsync(customer.Email, customer.FullName, order.Id, request.CartItems);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[Email Error] Không thể gửi email: {ex.Message}");
                }

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

        private async Task SendOrderConfirmationEmailAsync(string toEmail, string customerName, int orderId, List<CartItemDto> cartItems)
        {
            if (string.IsNullOrEmpty(toEmail)) return;

            string fromEmail = "datthanh12ab@gmail.com";
            string fromPassword = "jpcj ugne ojvl mpyn"; // App Password thật của Gmail

            var fromAddress = new MailAddress(fromEmail, "Dat Solution Store");
            var toAddress = new MailAddress(toEmail, customerName);
            string subject = $"Xác nhận đơn hàng #{orderId} - Dat Solution";
            
            // Xây dựng nội dung email
            string body = $"<h2>Xin chào {customerName},</h2>" +
                          $"<p>Cảm ơn bạn đã đặt hàng tại Dat Solution Store.</p>" +
                          $"<p>Mã đơn hàng của bạn là: <strong>#{orderId}</strong></p>" +
                          $"<h3>Chi tiết sản phẩm:</h3><ul>";

            decimal totalAmount = 0;
            foreach (var item in cartItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product != null)
                {
                    decimal lineTotal = item.Quantity * product.Price;
                    totalAmount += lineTotal;
                    body += $"<li>{product.Name} - Số lượng: {item.Quantity} - Đơn giá: {product.Price:N0}đ</li>";
                }
            }
            
            body += $"</ul><p><strong>Tổng cộng: {totalAmount:N0}đ</strong></p>" +
                    $"<p>Chúng tôi sẽ sớm liên hệ để giao hàng.</p>" +
                    $"<p>Trân trọng,<br>Đội ngũ Dat Solution.</p>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
            {
                await smtp.SendMailAsync(message);
            }
        }

        #endregion
    }
}
