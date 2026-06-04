using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNameDat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "Phương pháp học tập và kỹ năng mềm.");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 6, "Chia sẻ kinh nghiệm startup và kinh doanh online.", "Kinh doanh Khởi nghiệp" },
                    { 7, "Đánh giá các bộ phim bom tấn và series mới nhất.", "Review Phim Ảnh" }
                });

            migrationBuilder.InsertData(
                table: "CategoryProducts",
                columns: new[] { "Id", "CategoryId", "Description", "Name" },
                values: new object[] { 5, null, "Nón, túi xách, kính mát, vớ và các phụ kiện thời trang khác.", "Phụ kiện" });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "Email", "FullName", "Password", "Phone" },
                values: new object[,]
                {
                    { 2, "45 Lê Lợi, Quận 1, TP.HCM", "hoatran@gmail.com", "Trần Thị Hoa", "hoa123", "0912345678" },
                    { 3, "78 Nguyễn Huệ, Quận 1, TP.HCM", "tuanle@gmail.com", "Lê Minh Tuấn", "tuan456", "0987654321" },
                    { 4, "22 Trần Hưng Đạo, Quận 5, TP.HCM", "nganpham@gmail.com", "Phạm Thu Ngân", "ngan789", "0936789012" },
                    { 5, "101 Điện Biên Phủ, Bình Thạnh, TP.HCM", "namvu@gmail.com", "Vũ Hoàng Nam", "nam321", "0971234567" },
                    { 6, "1 Vùng Cấm, Chợ Lớn, TP.HCM", "longly@gmail.com", "Lý Tiểu Long", "long123", "0999888777" }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CustomerId", "Notes", "OrderDate", "Status" },
                values: new object[,]
                {
                    { 1, 1, "Giao giờ hành chính", new DateTime(2026, 5, 20, 9, 30, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 5, 1, null, new DateTime(2026, 6, 3, 11, 20, 0, 0, DateTimeKind.Unspecified), 0 }
                });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "ASP.NET Core là framework mã nguồn mở của Microsoft, cho phép xây dựng ứng dụng web hiệu năng cao, đa nền tảng. Để bắt đầu học ASP.NET Core, bạn cần nắm vững C#, HTML/CSS/JavaScript cơ bản.\n\nBước 1: Học C# từ cơ bản đến nâng cao (OOP, LINQ, async/await)\nBước 2: Tìm hiểu về HTTP, REST API và web fundamentals\nBước 3: Bắt đầu với ASP.NET Core MVC - tìm hiểu về Controller, View, Model\nBước 4: Học Entity Framework Core để thao tác với database\nBước 5: Thực hành xây dựng dự án thực tế như CMS, Shop, Blog...\n\nHãy thực hành đều đặn mỗi ngày, tham gia cộng đồng lập trình viên và không ngại đặt câu hỏi khi gặp khó khăn. Chúc bạn thành công!", new DateTime(2026, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600", "Lộ trình học ASP.NET Core từ A đến Z" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Mùa hè 2026 đang đến gần, đây là thời điểm lý tưởng để khám phá những bãi biển tuyệt đẹp trải dài từ Bắc vào Nam của Việt Nam.\n\n1. Phú Quốc - 'Đảo Ngọc' với nước biển trong xanh, bãi cát trắng mịn\n2. Đà Nẵng - Bãi biển Mỹ Khê được tạp chí Forbes bình chọn là một trong những bãi biển đẹp nhất hành tinh\n3. Nha Trang - Thiên đường nghỉ dưỡng với vịnh biển hình bán nguyệt\n4. Hội An - Cửa Đại với vẻ đẹp bình yên, làng quê yên ả\n5. Phan Thiết - Mũi Né với đồi cát bay đặc trưng độc đáo\n6. Quy Nhơn - Eo Gió với vẻ hoang sơ và sóng biển hùng vĩ\n7. Vũng Tàu - Điểm du lịch cuối tuần lý tưởng của người Sài Gòn\n\nDù bạn đi bất kỳ bãi biển nào, hãy nhớ bảo vệ môi trường và không xả rác xuống biển nhé!", new DateTime(2026, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", "Top 7 bãi biển đẹp nhất Việt Nam hè 2026" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Chạy bộ là một trong những bài tập thể dục đơn giản, hiệu quả và tiết kiệm chi phí nhất. Với kế hoạch tập luyện đúng đắn, bạn hoàn toàn có thể giảm 5kg trong vòng 1 tháng.\n\nKế hoạch tập:\n- Tuần 1: Chạy nhẹ 20-30 phút, tốc độ 6-7 km/h, 3 buổi/tuần\n- Tuần 2: Tăng lên 35-40 phút, thêm 1 buổi, tốc độ 7-8 km/h\n- Tuần 3: Chạy interval (1 phút nhanh + 2 phút chậm), 4-5 buổi/tuần\n- Tuần 4: Chạy dài 45-50 phút liên tục, kết hợp uphill\n\nMẹo quan trọng: Uống đủ nước, ăn nhẹ trước tập 1-2 tiếng, mang giày chuyên dụng, và quan trọng nhất là kiên trì! Đừng bỏ cuộc sau 1-2 tuần khi chưa thấy kết quả.", new DateTime(2026, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600", "5 bài tập chạy bộ giúp bạn giảm 5kg trong 1 tháng" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Trí tuệ nhân tạo (AI) đang len lỏi vào mọi ngành nghề, và thời trang cũng không ngoại lệ. Từ thiết kế đến bán lẻ, AI đang cách mạng hóa cách chúng ta mua sắm và mặc đẹp.\n\nCác ứng dụng AI trong thời trang:\n1. Gợi ý phong cách cá nhân: Các ứng dụng như Stitch Fix dùng AI để phân tích sở thích và đề xuất trang phục phù hợp\n2. Thử đồ ảo (Virtual Try-On): AR + AI cho phép thử quần áo ngay trên điện thoại\n3. Dự đoán xu hướng: AI phân tích dữ liệu mạng xã hội để dự báo trend mùa tới\n4. Tối ưu chuỗi cung ứng: AI giúp quản lý tồn kho và giảm lãng phí sản xuất\n5. Thiết kế AI: Các model AI như DALL-E có thể tạo ra những mẫu thiết kế độc đáo\n\nThời trang AI không phải là tương lai xa vời - nó đang diễn ra ngay hôm nay!", new DateTime(2026, 5, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600", "AI đang thay đổi ngành thời trang như thế nào?" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Làm việc nhóm là kỹ năng không thể thiếu trong môi trường công nghệ. Hầu hết các dự án phần mềm đều yêu cầu sự phối hợp của nhiều người, từ lập trình viên, designer đến tester.\n\nCác nguyên tắc vàng khi làm việc nhóm:\n1. Phân chia công việc rõ ràng: Dùng Trello, Jira, hoặc GitHub Projects để assign task\n2. Giao tiếp thường xuyên: Daily standup ngắn 15 phút để sync tiến độ\n3. Code review lẫn nhau: Không có code nào hoàn hảo ngay lần đầu\n4. Sử dụng Git flow: Branch riêng cho từng feature, merge request có review\n5. Tôn trọng ý kiến: Tranh luận về code, không tranh luận về cái tôi\n6. Document đầy đủ: README.md, API docs, comment code rõ ràng\n\nKỹ năng teamwork tốt sẽ là lợi thế lớn khi bạn đi phỏng vấn tại các công ty công nghệ!", new DateTime(2026, 5, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600", "Kỹ năng Teamwork hiệu quả trong nhóm đồ án CNTT" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { 6, 2, "Athleisure - phong cách kết hợp giữa thể thao (athletic) và thời thượng (leisure) - đang là xu hướng thống trị thời trang 2026. Không chỉ mặc tập gym, quần áo thể thao giờ đây xuất hiện khắp mọi nơi từ văn phòng đến tiệc cocktail.\n\nĐặc trưng của Athleisure:\n- Chất liệu: Vải co giãn 4 chiều, thấm hút mồ hôi, chống nhăn\n- Màu sắc: Earth tone (nâu đất, be, khaki), monochrome, pastel\n- Item must-have: Legging, jogger, hoodie oversized, sneakers white\n- Brand nổi bật: Nike, Adidas, Lululemon, Vuori\n\nCách phối đồ Athleisure đi làm:\n- Legging đen + blazer trắng + sneakers trắng\n- Jogger kaki + áo thun trắng tucked-in + loafer\n- Sports bra + high-waist shorts + oversized jacket\n\nAthleisure là lựa chọn hoàn hảo cho nhịp sống bận rộn ngày nay!", new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600", "Xu hướng thời trang thể thao Athleisure 2026" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Áo thun cơ bản màu trắng, form regular fit, chất cotton 100% thoáng mát, thích hợp mặc mọi dịp.", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400", "Áo Thun Cotton Basic Trắng" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Áo thun polo cổ bẻ màu xanh navy lịch sự, chất pique cotton, phù hợp đi học, đi làm, dạo phố.", "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=400", "Áo Thun Polo Premium Navy" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 1, "Áo thun in hình streetwear phong cách, chất cotton mềm mịn, form oversized trendy.", "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=400", "Áo Thun Graphic Streetwear", 180000m, 40 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 1, "Áo thun crop top nữ xinh xắn, dễ phối đồ, phong cách Hàn Quốc tươi trẻ.", "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400", "Áo Thun Crop Top Nữ", 160000m, 35 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jeans slimfit màu xanh denim cổ điển, co giãn nhẹ, ôm dáng tôn vóc dáng.", "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400", "Quần Jeans Slimfit Xanh", 350000m, 25 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jeans skinny màu đen cá tính, co giãn 4 chiều, thoải mái khi vận động.", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400", "Quần Jeans Skinny Đen", 380000m, 20 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jean baggy form rộng unisex phong cách Y2K đang thịnh hành, nam nữ đều mặc được.", "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=400", "Quần Jean Baggy Unisex", 420000m, 18 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jean rách gối phong cách cá tính, wash màu nhạt, kết hợp dễ dàng với áo thun.", "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=400", "Quần Jean Rách Gối Trendy", 390000m, 15 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 9, 3, "Đầm voan hoa nhí dịu dàng phong cách vintage, phù hợp đi chơi, picnic, dạo phố.", "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=400", "Váy Hoa Nhí Vintage", 290000m, 15 },
                    { 10, 3, "Đầm ôm body tôn dáng, chất liệu satin cao cấp, thích hợp dự tiệc, sự kiện sang trọng.", "https://images.unsplash.com/photo-1566479179817-b359d2ee0f57?q=80&w=400", "Đầm Dạ Hội Sang Trọng", 650000m, 10 },
                    { 11, 3, "Váy midi kẻ sọc thanh lịch, dài qua gối, phù hợp đi làm và đi chơi.", "https://images.unsplash.com/photo-1568252542512-9fe8fe9f6e1a?q=80&w=400", "Váy Midi Kẻ Sọc", 320000m, 22 },
                    { 12, 3, "Chân váy xòe phong cách lolita đáng yêu, nhiều màu pastel, kết hợp với áo tuck-in.", "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400", "Chân Váy Xòe Lolita", 280000m, 20 },
                    { 13, 4, "Áo khoác bomber chất kaki cao cấp, 2 lớp giữ ấm, phong cách quân đội trendy.", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400", "Áo Khoác Bomber Kaki", 450000m, 40 },
                    { 14, 4, "Áo hoodie nỉ bông ấm áp, form rộng unisex, có túi kangaroo và mũ che đầu.", "https://images.unsplash.com/photo-1556821840-3a63f15732ce?q=80&w=400", "Áo Khoác Hoodie Unisex", 320000m, 35 },
                    { 15, 4, "Áo khoác gió chống nước nhẹ, có thể gấp lại bỏ túi, phù hợp du lịch, leo núi.", "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=400", "Áo Khoác Gió Chống Nước", 520000m, 28 },
                    { 16, 4, "Áo blazer kẻ caro thanh lịch, oversize nhẹ, phù hợp đi làm, hội thảo, meeting.", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", "Áo Blazer Lịch Sự", 580000m, 12 }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FullName", "PasswordHash", "Username" },
                values: new object[] { "Nguyễn Cao Đạt", "dat1969", "dat_gv" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FullName", "PasswordHash", "Role", "Username" },
                values: new object[] { 6, "Phạm Thị Marketing", "mkt123", "Editor", "marketing_01" });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "Id", "OrderId", "ProductId", "Quantity", "UnitPrice" },
                values: new object[,]
                {
                    { 1, 1, 1, 2, 150000m },
                    { 2, 1, 5, 1, 350000m },
                    { 9, 5, 16, 1, 580000m }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CustomerId", "Notes", "OrderDate", "Status" },
                values: new object[,]
                {
                    { 2, 2, null, new DateTime(2026, 5, 22, 14, 15, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 3, 3, "Gọi điện trước khi giao", new DateTime(2026, 5, 28, 10, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 4, 4, "Giao buổi tối sau 18h", new DateTime(2026, 6, 1, 16, 45, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 6, 5, "Bọc kỹ hộp quà tặng", new DateTime(2026, 6, 4, 8, 0, 0, 0, DateTimeKind.Unspecified), 0 },
                    { 7, 6, "Đóng gói cẩn thận", new DateTime(2026, 6, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), 0 }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 7, 6, "Khởi nghiệp chưa bao giờ là con đường dễ dàng. Dưới đây là 5 bài học xương máu từ những founder đã từng thất bại và làm lại từ đầu: 1. Đừng làm sản phẩm không ai cần. 2. Quản lý dòng tiền chặt chẽ. 3. Tuyển đúng người. 4. Lắng nghe khách hàng. 5. Kiên trì nhưng biết điểm dừng.", new DateTime(2026, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1556761175-5972d5ce14ef?q=80&w=600", "5 Bài Học Đắt Giá Khi Lần Đầu Khởi Nghiệp" },
                    { 8, 7, "Dune mang đến một trải nghiệm thị giác và thính giác tuyệt đỉnh. Kỹ xảo hoành tráng, âm nhạc hùng hồn của Hans Zimmer, cùng diễn xuất xuất thần của dàn cast khiến bộ phim này trở thành một trong những tác phẩm khoa học viễn tưởng vĩ đại nhất thập kỷ.", new DateTime(2026, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600", "Review: Dune: Hành Tinh Cát - Siêu phẩm không thể bỏ lỡ" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 17, 5, "Nón lưỡi trai chất kaki bền đẹp, thêu chữ phong cách streetwear.", "https://images.unsplash.com/photo-1521369909029-2afed882ba54?q=80&w=400", "Nón Lưỡi Trai Thêu Chữ", 120000m, 60 },
                    { 18, 5, "Túi tote vải canvas cỡ lớn, đựng vừa laptop 14 inch, tiện dụng cho dân văn phòng và sinh viên.", "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400", "Túi Tote Canvas Basic", 99000m, 80 }
                });

            migrationBuilder.InsertData(
                table: "OrderDetails",
                columns: new[] { "Id", "OrderId", "ProductId", "Quantity", "UnitPrice" },
                values: new object[,]
                {
                    { 3, 2, 9, 1, 290000m },
                    { 4, 2, 14, 1, 320000m },
                    { 5, 3, 14, 1, 320000m },
                    { 6, 3, 7, 1, 420000m },
                    { 7, 4, 11, 2, 320000m },
                    { 8, 4, 4, 1, 160000m },
                    { 10, 6, 15, 1, 520000m },
                    { 11, 6, 6, 2, 380000m },
                    { 12, 7, 17, 1, 120000m },
                    { 13, 7, 18, 1, 99000m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "OrderDetails",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "CategoryProducts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "Phương pháp học tập và kỹ năng mềm .");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Hướng dẫn chi tiết cho người mới bắt đầu...", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/dotnet.jpg", "Lộ trình học ASP.NET" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Những địa điểm không thể bỏ qua mùa hè này...", new DateTime(2026, 4, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/beach.jpg", "Top 5 bãi biển đẹp" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Lợi ích tuyệt vời của việc chạy bộ mỗi sáng...", new DateTime(2026, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/run.jpg", "Chạy bộ đúng cách" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Trí tuệ nhân tạo đang thay đổi cuộc sống...", new DateTime(2026, 4, 4, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/ai.jpg", "AI và tương lai" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Content", "CreatedDate", "ImageUrl", "Title" },
                values: new object[] { "Cách phối hợp hiệu quả trong nhóm đồ án...", new DateTime(2026, 4, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "/img/team.jpg", "Kỹ năng Teamwork" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Áo thun cơ bản, form rộng, vải cotton co giãn 4 chiều mềm mịn.", "/uploads/aothun1.jpg", "Áo Thun Cotton Basic" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Áo thun polo cổ bẻ lịch sự, phù hợp đi học, đi làm, dạo phố.", "/uploads/aothun2.jpg", "Áo Thun Polo Premium" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jeans ống ôm nhẹ, màu xanh truyền thống trẻ trung.", "/uploads/jean1.jpg", "Quần Jeans Slimfit Blue", 350000m, 25 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 2, "Quần jeans ôm dáng skinny màu đen cá tính, co giãn thoải mái.", "/uploads/jean2.jpg", "Quần Jeans Skinny Black", 380000m, 20 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 3, "Đầm voan hoa nhí dịu dàng, phong cách vintage thanh lịch.", "/uploads/vay1.jpg", "Váy Hoa Nhí Vintage", 290000m, 15 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 3, "Đầm ôm body tôn dáng, thích hợp cho các buổi tiệc tối sang trọng.", "/uploads/vay2.jpg", "Đầm Dạ Hội Sang Trọng", 650000m, 10 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 4, "Áo khoác bomber chất kaki cao cấp, 2 lớp giữ ấm tốt.", "/uploads/khoak1.jpg", "Áo Khoác Bomber Kaki", 450000m, 40 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[] { 4, "Áo hoodie nỉ bông ấm áp, form rộng unisex nam nữ đều mặc được.", "/uploads/khoak2.jpg", "Áo Khoác Hoodie Unisex", 320000m, 35 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FullName", "PasswordHash", "Username" },
                values: new object[] { "Nguyễn Cao Thái", "thai1969", "thai_gv" });
        }
    }
}
