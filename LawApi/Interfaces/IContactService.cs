using LawApi.Models;

namespace LawApi.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactUs>> GetContactUsAsync();
        Task<ContactUs> GetContactByIdAsync(int id);
        Task<ContactUs> AddContactAsync(ContactUs contact);
        Task DeleteContactAsync(ContactUs contact);
    }
}
