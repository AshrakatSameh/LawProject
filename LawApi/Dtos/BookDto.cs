namespace LawApi.Dtos
{
    public class BookDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Author { get; set; }
        public IFormFile? Image { get; set; }
        public IFormFile? BookPdf { get; set; }
    }

   public class BookToUpdateDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Author { get; set; }
        public IFormFile? Image { get; set; }
        public IFormFile? BookPdf { get; set; }
        public string? ImageUrl { get; set; }

    }
}
