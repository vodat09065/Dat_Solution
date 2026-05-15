/*
- Sinh vien: Vo Thanh Dat
- MSSV: 2123110212
- Ngay tao: 15/05/2026
*/


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMS.Data.Entities
{
    internal class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; } // Quản trị viên hoặc Biên tập viên

    }
}
