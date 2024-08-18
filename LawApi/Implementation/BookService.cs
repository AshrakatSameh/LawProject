using LawApi.Context;
using LawApi.Dtos;
using LawApi.Interfaces;
using LawApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LawApi.Implementation
{
    public class BookService : IBookService
    {
        private readonly AppDbContext _context;

        public BookService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task DeleteBookAsync(Book book)
        {
            if(book == null)
            {
                throw new ArgumentNullException(nameof(book), "The book to delete cannot be null.");
            }
            else
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
            
        }

        public async Task<Book> GetBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return book;
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return book;
        }
    }
}
