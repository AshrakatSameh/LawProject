namespace LawApi.Dtos
{
    public class ArticleDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? PostDate { get; set; } = DateTime.Now;
    }
}
