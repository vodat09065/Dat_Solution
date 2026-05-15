/*
- Sinh vien: Vo Thanh Dat
- MSSV: 2123110212
- Ngay tao: 15/05/2026
- Thuc hien quan ly danh muc
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Data.Entities
{
    // Thuc the
    internal class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } // Tên danh mục (vd: Tin Giáo Dục)
        public string Description { get; set; }
        // Quan hệ: Một danh mục có nhiều bài viết
        public virtual ICollection<Post> Posts { get; set; }

    }
}
