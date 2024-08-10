using System.ComponentModel.DataAnnotations;

namespace LawApi.Models
{
    public class Articles
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? PostDate { get; set; } = DateTime.Now;
    }
}
