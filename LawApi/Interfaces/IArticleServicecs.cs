using LawApi.Dtos;
using LawApi.Models;

namespace LawApi.Interfaces
{
    public interface IArticleServicecs
    {
        Task<IEnumerable<Articles>> GetArticlesAsync();
        Task<Articles> GetArticlesByIdAsync(int id);
        Task<Articles> AddArticlesAsync(Articles article);
        Task<Articles> UpdateArticlesAsync(Articles article);
        Task DeleteArticlesAsync(Articles article);
    }
}
