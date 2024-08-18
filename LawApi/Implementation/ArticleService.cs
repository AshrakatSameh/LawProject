using LawApi.Context;
using LawApi.Dtos;
using LawApi.Interfaces;
using LawApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LawApi.Implementation
{
    public class ArticleService : IArticleServicecs
    {
        private readonly AppDbContext _context;

        public ArticleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Articles> AddArticlesAsync(Articles article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return article;
        }

        public async Task DeleteArticlesAsync(Articles article)
        {
            if (article == null)
            {
                throw new ArgumentNullException(nameof(article), "The book to delete cannot be null.");
            }
            else
            {
                _context.Articles.Remove(article);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Articles>> GetArticlesAsync()
        {
            return await _context.Articles.ToListAsync();
        }

        public async Task<Articles> GetArticlesByIdAsync(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            return article;
        }

        public async Task<Articles> UpdateArticlesAsync(Articles article)
        {
            _context.Articles.Update(article);
            await _context.SaveChangesAsync();
            return article;
        }
    }
}
