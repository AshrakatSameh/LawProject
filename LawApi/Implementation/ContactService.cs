using LawApi.Context;
using LawApi.Interfaces;
using LawApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LawApi.Implementation
{
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;

        public ContactService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ContactUs> AddContactAsync(ContactUs contact)
        {
            _context.ContactUs.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task DeleteContactAsync(ContactUs contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException(nameof(contact), "The contact to delete cannot be null.");
            }
            else
            {
                _context.ContactUs.Remove(contact);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ContactUs> GetContactByIdAsync(int id)
        {
            var contact = await _context.ContactUs.FindAsync(id);
            return contact;
        }

        public async Task<IEnumerable<ContactUs>> GetContactUsAsync()
        {
            return await _context.ContactUs.ToListAsync();
        }
    }
}
