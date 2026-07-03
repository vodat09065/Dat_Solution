using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            // 1. Kiểm tra tài khoản trong Database
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user != null && (BCrypt.Net.BCrypt.Verify(password, user.PasswordHash) || user.PasswordHash == password))
            {
                // Fallback: Nếu đúng mật khẩu thô thì tự động nâng cấp băm mật khẩu
                if (user.PasswordHash == password)
                {
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                    _context.Users.Update(user);
                    _context.SaveChanges();
                }

                // 2. Thiết lập danh tính (Claims)
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role ?? "User"), // Lưu vai trò: Admin/Editor
                    new Claim("FullName", user.FullName ?? "")
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // 3. Đăng nhập và lưu Cookie vào trình duyệt
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                    new ClaimsPrincipal(claimsIdentity));

                return RedirectToAction("Index", "Home");
            }

            ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng!";
            return View();
        }

        // Hàm đăng xuất
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        // Tạo tài khoản Admin khẩn cấp (có thể xóa sau khi dùng)
        [HttpGet]
        public IActionResult InitAdmin()
        {
            var adminUser = _context.Users.FirstOrDefault(u => u.Username == "admin");
            if (adminUser == null)
            {
                adminUser = new CMS.Data.Entities.User
                {
                    Username = "admin",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                    FullName = "Administrator",
                    Role = "Admin"
                };
                _context.Users.Add(adminUser);
            }
            else
            {
                // Reset mật khẩu về 123456 nếu tài khoản đã tồn tại
                adminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456");
                _context.Users.Update(adminUser);
            }
            
            _context.SaveChanges();
            return Content("Đã tạo/reset tài khoản Admin! Tên đăng nhập: admin - Mật khẩu: 123456");
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
