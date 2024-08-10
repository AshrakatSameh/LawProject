using System.ComponentModel.DataAnnotations;

namespace LawApi.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string?Description { get; set; }
        public string? Author { get; set; }
        public string? ImageUrl { get; set; }
        public string? BookPdf { get; set; }

    }
}
