using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBannersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Banners",
                columns: new[] { "Id", "CreatedDate", "Description", "ImageUrl", "IsActive", "SortOrder", "TargetUrl", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Khám phá phong cách mới nhất", "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200", true, 1, "/shop", "Bộ sưu tập Hè 2026" },
                    { 2, new DateTime(2026, 6, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Thanh lịch và tự tin", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200", true, 2, "/shop?category=3", "Thời trang công sở" },
                    { 3, new DateTime(2026, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "Dành riêng cho khách hàng mới", "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200", true, 3, "/shop", "Khuyến mãi 50%" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6479));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6485));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6487));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6488));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6489));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6490));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6491));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6493));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6494));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6495));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6569));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6571));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6572));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6573));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6575));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6576));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6577));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "CreatedDate",
                value: new DateTime(2026, 7, 2, 14, 33, 3, 592, DateTimeKind.Local).AddTicks(6578));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2615));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2623));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2624));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2626));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2627));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2628));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2630));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2631));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2632));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2634));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2635));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2636));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 13,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2637));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 14,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2639));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 15,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2640));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 16,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2641));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 17,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2642));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 18,
                column: "CreatedDate",
                value: new DateTime(2026, 6, 26, 14, 7, 32, 826, DateTimeKind.Local).AddTicks(2644));
        }
    }
}
