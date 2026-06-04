using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_CategoriesProducts_CategoryProductId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoriesProducts",
                table: "CategoriesProducts");

            migrationBuilder.RenameTable(
                name: "CategoriesProducts",
                newName: "CategoryProducts");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "CategoryProducts",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryProducts",
                table: "CategoryProducts",
                column: "Id");

            migrationBuilder.InsertData(
                table: "CategoryProducts",
                columns: new[] { "Id", "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, null, "Các sản phẩm áo thun cotton 100% thoáng mát, co giãn tốt.", "Áo thun Nam/Nữ" },
                    { 2, null, "Quần jeans nam nữ kiểu dáng hiện đại, chất denim dày dặn.", "Quần Jeans" },
                    { 3, null, "Đầm váy thiết kế, chất liệu nhẹ nhàng, sang trọng.", "Váy thời trang" },
                    { 4, null, "Áo khoác gió, hoodie, bomber phong cách trẻ trung.", "Áo khoác" }
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Address", "Email", "FullName", "Password", "Phone" },
                values: new object[] { 1, "123 Đường Ba Tháng Hai, Quận 10, TP.HCM", "khachhang@gmail.com", "Nguyễn Văn Khách", "123", "0908765432" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryProductId", "Description", "ImageUrl", "Name", "Price", "StockQuantity" },
                values: new object[,]
                {
                    { 1, 1, "Áo thun cơ bản, form rộng, vải cotton co giãn 4 chiều mềm mịn.", "/uploads/aothun1.jpg", "Áo Thun Cotton Basic", 150000m, 50 },
                    { 2, 1, "Áo thun polo cổ bẻ lịch sự, phù hợp đi học, đi làm, dạo phố.", "/uploads/aothun2.jpg", "Áo Thun Polo Premium", 220000m, 30 },
                    { 3, 2, "Quần jeans ống ôm nhẹ, màu xanh truyền thống trẻ trung.", "/uploads/jean1.jpg", "Quần Jeans Slimfit Blue", 350000m, 25 },
                    { 4, 2, "Quần jeans ôm dáng skinny màu đen cá tính, co giãn thoải mái.", "/uploads/jean2.jpg", "Quần Jeans Skinny Black", 380000m, 20 },
                    { 5, 3, "Đầm voan hoa nhí dịu dàng, phong cách vintage thanh lịch.", "/uploads/vay1.jpg", "Váy Hoa Nhí Vintage", 290000m, 15 },
                    { 6, 3, "Đầm ôm body tôn dáng, thích hợp cho các buổi tiệc tối sang trọng.", "/uploads/vay2.jpg", "Đầm Dạ Hội Sang Trọng", 650000m, 10 },
                    { 7, 4, "Áo khoác bomber chất kaki cao cấp, 2 lớp giữ ấm tốt.", "/uploads/khoak1.jpg", "Áo Khoác Bomber Kaki", 450000m, 40 },
                    { 8, 4, "Áo hoodie nỉ bông ấm áp, form rộng unisex nam nữ đều mặc được.", "/uploads/khoak2.jpg", "Áo Khoác Hoodie Unisex", 320000m, 35 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryProducts_CategoryId",
                table: "CategoryProducts",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryProducts_Categories_CategoryId",
                table: "CategoryProducts",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_CategoryProducts_CategoryProductId",
                table: "Products",
                column: "CategoryProductId",
                principalTable: "CategoryProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryProducts_Categories_CategoryId",
                table: "CategoryProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_CategoryProducts_CategoryProductId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryProducts",
                table: "CategoryProducts");

            migrationBuilder.DropIndex(
                name: "IX_CategoryProducts_CategoryId",
                table: "CategoryProducts");

            migrationBuilder.DeleteData(
                table: "Customers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "CategoryProducts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CategoryProducts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CategoryProducts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CategoryProducts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "CategoryProducts");

            migrationBuilder.RenameTable(
                name: "CategoryProducts",
                newName: "CategoriesProducts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoriesProducts",
                table: "CategoriesProducts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_CategoriesProducts_CategoryProductId",
                table: "Products",
                column: "CategoryProductId",
                principalTable: "CategoriesProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
