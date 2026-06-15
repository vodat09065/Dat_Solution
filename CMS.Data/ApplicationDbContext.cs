using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;

namespace CMS.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Khai báo các bảng dữ liệu
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CategoryProduct> CategoryProducts { get; set; }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =============================================
            // 1. BẢNG CATEGORIES (Danh mục bài viết)
            // =============================================
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Tin tức Công nghệ", Description = "Cập nhật xu hướng AI, IoT và lập trình." },
                new Category { Id = 2, Name = "Đời sống du lịch", Description = "Kinh nghiệm phượt và các điểm đến hấp dẫn." },
                new Category { Id = 3, Name = "Sức khỏe Thể thao", Description = "Các bài tập và chế độ ăn uống lành mạnh." },
                new Category { Id = 4, Name = "Giáo dục Kỹ năng", Description = "Phương pháp học tập và kỹ năng mềm." },
                new Category { Id = 5, Name = "Góc lập trình viên", Description = "Tài liệu ASP.NET Core và SQL Server." },
                new Category { Id = 6, Name = "Kinh doanh Khởi nghiệp", Description = "Chia sẻ kinh nghiệm startup và kinh doanh online." },
                new Category { Id = 7, Name = "Review Phim Ảnh", Description = "Đánh giá các bộ phim bom tấn và series mới nhất." }
            );

            // =============================================
            // 2. BẢNG POSTS (Bài viết - nội dung đầy đủ)
            // =============================================
            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    Id = 1,
                    Title = "Lộ trình học ASP.NET Core từ A đến Z",
                    Content = "ASP.NET Core là framework mã nguồn mở của Microsoft, cho phép xây dựng ứng dụng web hiệu năng cao, đa nền tảng. Để bắt đầu học ASP.NET Core, bạn cần nắm vững C#, HTML/CSS/JavaScript cơ bản.\n\nBước 1: Học C# từ cơ bản đến nâng cao (OOP, LINQ, async/await)\nBước 2: Tìm hiểu về HTTP, REST API và web fundamentals\nBước 3: Bắt đầu với ASP.NET Core MVC - tìm hiểu về Controller, View, Model\nBước 4: Học Entity Framework Core để thao tác với database\nBước 5: Thực hành xây dựng dự án thực tế như CMS, Shop, Blog...\n\nHãy thực hành đều đặn mỗi ngày, tham gia cộng đồng lập trình viên và không ngại đặt câu hỏi khi gặp khó khăn. Chúc bạn thành công!",
                    ImageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
                    CategoryId = 5,
                    CreatedDate = new DateTime(2026, 5, 10)
                },
                new Post
                {
                    Id = 2,
                    Title = "Top 7 bãi biển đẹp nhất Việt Nam hè 2026",
                    Content = "Mùa hè 2026 đang đến gần, đây là thời điểm lý tưởng để khám phá những bãi biển tuyệt đẹp trải dài từ Bắc vào Nam của Việt Nam.\n\n1. Phú Quốc - 'Đảo Ngọc' với nước biển trong xanh, bãi cát trắng mịn\n2. Đà Nẵng - Bãi biển Mỹ Khê được tạp chí Forbes bình chọn là một trong những bãi biển đẹp nhất hành tinh\n3. Nha Trang - Thiên đường nghỉ dưỡng với vịnh biển hình bán nguyệt\n4. Hội An - Cửa Đại với vẻ đẹp bình yên, làng quê yên ả\n5. Phan Thiết - Mũi Né với đồi cát bay đặc trưng độc đáo\n6. Quy Nhơn - Eo Gió với vẻ hoang sơ và sóng biển hùng vĩ\n7. Vũng Tàu - Điểm du lịch cuối tuần lý tưởng của người Sài Gòn\n\nDù bạn đi bất kỳ bãi biển nào, hãy nhớ bảo vệ môi trường và không xả rác xuống biển nhé!",
                    ImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
                    CategoryId = 2,
                    CreatedDate = new DateTime(2026, 5, 15)
                },
                new Post
                {
                    Id = 3,
                    Title = "5 bài tập chạy bộ giúp bạn giảm 5kg trong 1 tháng",
                    Content = "Chạy bộ là một trong những bài tập thể dục đơn giản, hiệu quả và tiết kiệm chi phí nhất. Với kế hoạch tập luyện đúng đắn, bạn hoàn toàn có thể giảm 5kg trong vòng 1 tháng.\n\nKế hoạch tập:\n- Tuần 1: Chạy nhẹ 20-30 phút, tốc độ 6-7 km/h, 3 buổi/tuần\n- Tuần 2: Tăng lên 35-40 phút, thêm 1 buổi, tốc độ 7-8 km/h\n- Tuần 3: Chạy interval (1 phút nhanh + 2 phút chậm), 4-5 buổi/tuần\n- Tuần 4: Chạy dài 45-50 phút liên tục, kết hợp uphill\n\nMẹo quan trọng: Uống đủ nước, ăn nhẹ trước tập 1-2 tiếng, mang giày chuyên dụng, và quan trọng nhất là kiên trì! Đừng bỏ cuộc sau 1-2 tuần khi chưa thấy kết quả.",
                    ImageUrl = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600",
                    CategoryId = 3,
                    CreatedDate = new DateTime(2026, 5, 20)
                },
                new Post
                {
                    Id = 4,
                    Title = "AI đang thay đổi ngành thời trang như thế nào?",
                    Content = "Trí tuệ nhân tạo (AI) đang len lỏi vào mọi ngành nghề, và thời trang cũng không ngoại lệ. Từ thiết kế đến bán lẻ, AI đang cách mạng hóa cách chúng ta mua sắm và mặc đẹp.\n\nCác ứng dụng AI trong thời trang:\n1. Gợi ý phong cách cá nhân: Các ứng dụng như Stitch Fix dùng AI để phân tích sở thích và đề xuất trang phục phù hợp\n2. Thử đồ ảo (Virtual Try-On): AR + AI cho phép thử quần áo ngay trên điện thoại\n3. Dự đoán xu hướng: AI phân tích dữ liệu mạng xã hội để dự báo trend mùa tới\n4. Tối ưu chuỗi cung ứng: AI giúp quản lý tồn kho và giảm lãng phí sản xuất\n5. Thiết kế AI: Các model AI như DALL-E có thể tạo ra những mẫu thiết kế độc đáo\n\nThời trang AI không phải là tương lai xa vời - nó đang diễn ra ngay hôm nay!",
                    ImageUrl = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600",
                    CategoryId = 1,
                    CreatedDate = new DateTime(2026, 5, 25)
                },
                new Post
                {
                    Id = 5,
                    Title = "Kỹ năng Teamwork hiệu quả trong nhóm đồ án CNTT",
                    Content = "Làm việc nhóm là kỹ năng không thể thiếu trong môi trường công nghệ. Hầu hết các dự án phần mềm đều yêu cầu sự phối hợp của nhiều người, từ lập trình viên, designer đến tester.\n\nCác nguyên tắc vàng khi làm việc nhóm:\n1. Phân chia công việc rõ ràng: Dùng Trello, Jira, hoặc GitHub Projects để assign task\n2. Giao tiếp thường xuyên: Daily standup ngắn 15 phút để sync tiến độ\n3. Code review lẫn nhau: Không có code nào hoàn hảo ngay lần đầu\n4. Sử dụng Git flow: Branch riêng cho từng feature, merge request có review\n5. Tôn trọng ý kiến: Tranh luận về code, không tranh luận về cái tôi\n6. Document đầy đủ: README.md, API docs, comment code rõ ràng\n\nKỹ năng teamwork tốt sẽ là lợi thế lớn khi bạn đi phỏng vấn tại các công ty công nghệ!",
                    ImageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
                    CategoryId = 4,
                    CreatedDate = new DateTime(2026, 5, 28)
                },
                new Post
                {
                    Id = 6,
                    Title = "Xu hướng thời trang thể thao Athleisure 2026",
                    Content = "Athleisure - phong cách kết hợp giữa thể thao (athletic) và thời thượng (leisure) - đang là xu hướng thống trị thời trang 2026. Không chỉ mặc tập gym, quần áo thể thao giờ đây xuất hiện khắp mọi nơi từ văn phòng đến tiệc cocktail.\n\nĐặc trưng của Athleisure:\n- Chất liệu: Vải co giãn 4 chiều, thấm hút mồ hôi, chống nhăn\n- Màu sắc: Earth tone (nâu đất, be, khaki), monochrome, pastel\n- Item must-have: Legging, jogger, hoodie oversized, sneakers white\n- Brand nổi bật: Nike, Adidas, Lululemon, Vuori\n\nCách phối đồ Athleisure đi làm:\n- Legging đen + blazer trắng + sneakers trắng\n- Jogger kaki + áo thun trắng tucked-in + loafer\n- Sports bra + high-waist shorts + oversized jacket\n\nAthleisure là lựa chọn hoàn hảo cho nhịp sống bận rộn ngày nay!",
                    ImageUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
                    CategoryId = 2,
                    CreatedDate = new DateTime(2026, 6, 1)
                },
                new Post
                {
                    Id = 7,
                    Title = "5 Bài Học Đắt Giá Khi Lần Đầu Khởi Nghiệp",
                    Content = "Khởi nghiệp chưa bao giờ là con đường dễ dàng. Dưới đây là 5 bài học xương máu từ những founder đã từng thất bại và làm lại từ đầu: 1. Đừng làm sản phẩm không ai cần. 2. Quản lý dòng tiền chặt chẽ. 3. Tuyển đúng người. 4. Lắng nghe khách hàng. 5. Kiên trì nhưng biết điểm dừng.",
                    ImageUrl = "https://images.unsplash.com/photo-1556761175-5972d5ce14ef?q=80&w=600",
                    CategoryId = 6,
                    CreatedDate = new DateTime(2026, 6, 2)
                },
                new Post
                {
                    Id = 8,
                    Title = "Review: Dune: Hành Tinh Cát - Siêu phẩm không thể bỏ lỡ",
                    Content = "Dune mang đến một trải nghiệm thị giác và thính giác tuyệt đỉnh. Kỹ xảo hoành tráng, âm nhạc hùng hồn của Hans Zimmer, cùng diễn xuất xuất thần của dàn cast khiến bộ phim này trở thành một trong những tác phẩm khoa học viễn tưởng vĩ đại nhất thập kỷ.",
                    ImageUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
                    CategoryId = 7,
                    CreatedDate = new DateTime(2026, 6, 3)
                }
            );

            // =============================================
            // 3. BẢNG USERS (Tài khoản quản trị viên)
            // =============================================
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = "123456", FullName = "Quản trị viên hệ thống", Role = "Admin" },
                new User { Id = 2, Username = "dat_gv", PasswordHash = "dat1969", FullName = "Nguyễn Cao Đạt", Role = "Editor" },
                new User { Id = 3, Username = "sv_01", PasswordHash = "student1", FullName = "Nguyễn Văn A", Role = "User" },
                new User { Id = 4, Username = "sv_02", PasswordHash = "student2", FullName = "Trần Thị B", Role = "User" },
                new User { Id = 5, Username = "moderator", PasswordHash = "mod789", FullName = "Lê Văn C", Role = "Moderator" },
                new User { Id = 6, Username = "marketing_01", PasswordHash = "mkt123", FullName = "Phạm Thị Marketing", Role = "Editor" }
            );

            // =============================================
            // 4. BẢNG CATEGORYPRODUCTS (Danh mục áo quần)
            // =============================================
            modelBuilder.Entity<CategoryProduct>().HasData(
                new CategoryProduct { Id = 1, Name = "Áo thun Nam/Nữ", Description = "Các sản phẩm áo thun cotton 100% thoáng mát, co giãn tốt." },
                new CategoryProduct { Id = 2, Name = "Quần Jeans", Description = "Quần jeans nam nữ kiểu dáng hiện đại, chất denim dày dặn." },
                new CategoryProduct { Id = 3, Name = "Váy thời trang", Description = "Đầm váy thiết kế, chất liệu nhẹ nhàng, sang trọng." },
                new CategoryProduct { Id = 4, Name = "Áo khoác", Description = "Áo khoác gió, hoodie, bomber phong cách trẻ trung." },
                new CategoryProduct { Id = 5, Name = "Phụ kiện", Description = "Nón, túi xách, kính mát, vớ và các phụ kiện thời trang khác." }
            );

            // =============================================
            // 5. BẢNG PRODUCTS (Sản phẩm - ảnh Unsplash thật)
            // =============================================
            modelBuilder.Entity<Product>().HasData(
                // --- Áo thun ---
                new Product { Id = 1, Name = "Áo Thun Cotton Basic Trắng", Price = 150000m, StockQuantity = 50, ImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400", CategoryProductId = 1, Description = "Áo thun cơ bản màu trắng, form regular fit, chất cotton 100% thoáng mát, thích hợp mặc mọi dịp." },
                new Product { Id = 2, Name = "Áo Thun Polo Premium Navy", Price = 220000m, StockQuantity = 30, ImageUrl = "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400", CategoryProductId = 1, Description = "Áo thun polo cổ bẻ màu xanh navy lịch sự, chất pique cotton, phù hợp đi học, đi làm, dạo phố." },
                new Product { Id = 3, Name = "Áo Thun Graphic Streetwear", Price = 180000m, StockQuantity = 40, ImageUrl = "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=400", CategoryProductId = 1, Description = "Áo thun in hình streetwear phong cách, chất cotton mềm mịn, form oversized trendy." },
                new Product { Id = 4, Name = "Áo Thun Crop Top Nữ", Price = 160000m, StockQuantity = 35, ImageUrl = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400", CategoryProductId = 1, Description = "Áo thun crop top nữ xinh xắn, dễ phối đồ, phong cách Hàn Quốc tươi trẻ." },

                // --- Quần Jeans ---
                new Product { Id = 5, Name = "Quần Jeans Slimfit Xanh", Price = 350000m, StockQuantity = 25, ImageUrl = "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400", CategoryProductId = 2, Description = "Quần jeans slimfit màu xanh denim cổ điển, co giãn nhẹ, ôm dáng tôn vóc dáng." },
                new Product { Id = 6, Name = "Quần Jeans Skinny Đen", Price = 380000m, StockQuantity = 20, ImageUrl = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400", CategoryProductId = 2, Description = "Quần jeans skinny màu đen cá tính, co giãn 4 chiều, thoải mái khi vận động." },
                new Product { Id = 7, Name = "Quần Jean Baggy Unisex", Price = 420000m, StockQuantity = 18, ImageUrl = "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400", CategoryProductId = 2, Description = "Quần jean baggy form rộng unisex phong cách Y2K đang thịnh hành, nam nữ đều mặc được." },
                new Product { Id = 8, Name = "Quần Jean Rách Gối Trendy", Price = 390000m, StockQuantity = 15, ImageUrl = "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400", CategoryProductId = 2, Description = "Quần jean rách gối phong cách cá tính, wash màu nhạt, kết hợp dễ dàng với áo thun." },

                // --- Váy ---
                new Product { Id = 9, Name = "Váy Hoa Nhí Vintage", Price = 290000m, StockQuantity = 15, ImageUrl = "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=400", CategoryProductId = 3, Description = "Đầm voan hoa nhí dịu dàng phong cách vintage, phù hợp đi chơi, picnic, dạo phố." },
                new Product { Id = 10, Name = "Đầm Dạ Hội Sang Trọng", Price = 650000m, StockQuantity = 10, ImageUrl = "https://images.unsplash.com/photo-1566479179817-b359d2ee0f57?q=80&w=400", CategoryProductId = 3, Description = "Đầm ôm body tôn dáng, chất liệu satin cao cấp, thích hợp dự tiệc, sự kiện sang trọng." },
                new Product { Id = 11, Name = "Váy Midi Kẻ Sọc", Price = 320000m, StockQuantity = 22, ImageUrl = "https://images.unsplash.com/photo-1568252542512-9fe8fe9f6e1a?q=80&w=400", CategoryProductId = 3, Description = "Váy midi kẻ sọc thanh lịch, dài qua gối, phù hợp đi làm và đi chơi." },
                new Product { Id = 12, Name = "Chân Váy Xòe Lolita", Price = 280000m, StockQuantity = 20, ImageUrl = "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400", CategoryProductId = 3, Description = "Chân váy xòe phong cách lolita đáng yêu, nhiều màu pastel, kết hợp với áo tuck-in." },

                // --- Áo khoác ---
                new Product { Id = 13, Name = "Áo Khoác Bomber Kaki", Price = 450000m, StockQuantity = 40, ImageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400", CategoryProductId = 4, Description = "Áo khoác bomber chất kaki cao cấp, 2 lớp giữ ấm, phong cách quân đội trendy." },
                new Product { Id = 14, Name = "Áo Khoác Hoodie Unisex", Price = 320000m, StockQuantity = 35, ImageUrl = "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=400", CategoryProductId = 4, Description = "Áo hoodie nỉ bông ấm áp, form rộng unisex, có túi kangaroo và mũ che đầu." },
                new Product { Id = 15, Name = "Áo Khoác Gió Chống Nước", Price = 520000m, StockQuantity = 28, ImageUrl = "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=400", CategoryProductId = 4, Description = "Áo khoác gió chống nước nhẹ, có thể gấp lại bỏ túi, phù hợp du lịch, leo núi." },
                new Product { Id = 16, Name = "Áo Blazer Lịch Sự", Price = 580000m, StockQuantity = 12, ImageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", CategoryProductId = 4, Description = "Áo blazer kẻ caro thanh lịch, oversize nhẹ, phù hợp đi làm, hội thảo, meeting." },
                
                // --- Phụ kiện ---
                new Product { Id = 17, Name = "Nón Lưỡi Trai Thêu Chữ", Price = 120000m, StockQuantity = 60, ImageUrl = "https://images.unsplash.com/photo-1521369909029-2afed882ba54?q=80&w=400", CategoryProductId = 5, Description = "Nón lưỡi trai chất kaki bền đẹp, thêu chữ phong cách streetwear." },
                new Product { Id = 18, Name = "Túi Tote Canvas Basic", Price = 99000m, StockQuantity = 80, ImageUrl = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400", CategoryProductId = 5, Description = "Túi tote vải canvas cỡ lớn, đựng vừa laptop 14 inch, tiện dụng cho dân văn phòng và sinh viên." }
            );

            // =============================================
            // 6. BẢNG CUSTOMERS (Khách hàng mẫu)
            // =============================================
            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, FullName = "Nguyễn Văn Khách", Email = "khachhang@gmail.com", Password = "123", Phone = "0908765432", Address = "123 Đường Ba Tháng Hai, Quận 10, TP.HCM" },
                new Customer { Id = 2, FullName = "Trần Thị Hoa", Email = "hoatran@gmail.com", Password = "hoa123", Phone = "0912345678", Address = "45 Lê Lợi, Quận 1, TP.HCM" },
                new Customer { Id = 3, FullName = "Lê Minh Tuấn", Email = "tuanle@gmail.com", Password = "tuan456", Phone = "0987654321", Address = "78 Nguyễn Huệ, Quận 1, TP.HCM" },
                new Customer { Id = 4, FullName = "Phạm Thu Ngân", Email = "nganpham@gmail.com", Password = "ngan789", Phone = "0936789012", Address = "22 Trần Hưng Đạo, Quận 5, TP.HCM" },
                new Customer { Id = 5, FullName = "Vũ Hoàng Nam", Email = "namvu@gmail.com", Password = "nam321", Phone = "0971234567", Address = "101 Điện Biên Phủ, Bình Thạnh, TP.HCM" },
                new Customer { Id = 6, FullName = "Lý Tiểu Long", Email = "longly@gmail.com", Password = "long123", Phone = "0999888777", Address = "1 Vùng Cấm, Chợ Lớn, TP.HCM" }
            );

            // =============================================
            // 7. BẢNG ORDERS (Đơn hàng mẫu)
            // =============================================
            modelBuilder.Entity<Order>().HasData(
                new Order { Id = 1, CustomerId = 1, OrderDate = new DateTime(2026, 5, 20, 9, 30, 0), Status = 2, Notes = "Giao giờ hành chính" },
                new Order { Id = 2, CustomerId = 2, OrderDate = new DateTime(2026, 5, 22, 14, 15, 0), Status = 2, Notes = null },
                new Order { Id = 3, CustomerId = 3, OrderDate = new DateTime(2026, 5, 28, 10, 0, 0), Status = 1, Notes = "Gọi điện trước khi giao" },
                new Order { Id = 4, CustomerId = 4, OrderDate = new DateTime(2026, 6, 1, 16, 45, 0), Status = 1, Notes = "Giao buổi tối sau 18h" },
                new Order { Id = 5, CustomerId = 1, OrderDate = new DateTime(2026, 6, 3, 11, 20, 0), Status = 0, Notes = null },
                new Order { Id = 6, CustomerId = 5, OrderDate = new DateTime(2026, 6, 4, 8, 0, 0), Status = 0, Notes = "Bọc kỹ hộp quà tặng" },
                new Order { Id = 7, CustomerId = 6, OrderDate = new DateTime(2026, 6, 4, 10, 0, 0), Status = 0, Notes = "Đóng gói cẩn thận" }
            );

            // =============================================
            // 8. BẢNG ORDERDETAILS (Chi tiết đơn hàng mẫu)
            // =============================================
            modelBuilder.Entity<OrderDetail>().HasData(
                // Order 1 (Đã xong): Nguyễn Văn Khách mua áo thun + quần jean
                new OrderDetail { Id = 1,  OrderId = 1, ProductId = 1,  Quantity = 2, UnitPrice = 150000m },
                new OrderDetail { Id = 2,  OrderId = 1, ProductId = 5,  Quantity = 1, UnitPrice = 350000m },

                // Order 2 (Đã xong): Trần Thị Hoa mua váy + áo khoác
                new OrderDetail { Id = 3,  OrderId = 2, ProductId = 9,  Quantity = 1, UnitPrice = 290000m },
                new OrderDetail { Id = 4,  OrderId = 2, ProductId = 14, Quantity = 1, UnitPrice = 320000m },

                // Order 3 (Đang giao): Lê Minh Tuấn mua hoodie + jean baggy
                new OrderDetail { Id = 5,  OrderId = 3, ProductId = 14, Quantity = 1, UnitPrice = 320000m },
                new OrderDetail { Id = 6,  OrderId = 3, ProductId = 7,  Quantity = 1, UnitPrice = 420000m },

                // Order 4 (Đang giao): Phạm Thu Ngân mua váy midi + áo thun crop
                new OrderDetail { Id = 7,  OrderId = 4, ProductId = 11, Quantity = 2, UnitPrice = 320000m },
                new OrderDetail { Id = 8,  OrderId = 4, ProductId = 4,  Quantity = 1, UnitPrice = 160000m },

                // Order 5 (Chờ duyệt): Nguyễn Văn Khách mua blazer
                new OrderDetail { Id = 9,  OrderId = 5, ProductId = 16, Quantity = 1, UnitPrice = 580000m },

                // Order 6 (Chờ duyệt): Vũ Hoàng Nam mua áo khoác gió + quần jean đen
                new OrderDetail { Id = 10, OrderId = 6, ProductId = 15, Quantity = 1, UnitPrice = 520000m },
                new OrderDetail { Id = 11, OrderId = 6, ProductId = 6,  Quantity = 2, UnitPrice = 380000m },
                
                // Order 7 (Chờ duyệt): Lý Tiểu Long mua nón và túi tote
                new OrderDetail { Id = 12, OrderId = 7, ProductId = 17, Quantity = 1, UnitPrice = 120000m },
                new OrderDetail { Id = 13, OrderId = 7, ProductId = 18, Quantity = 1, UnitPrice = 99000m }
            );
        }
    }
}
