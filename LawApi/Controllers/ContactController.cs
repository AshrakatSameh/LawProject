using LawApi.Dtos;
using LawApi.Interfaces;
using LawApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LawApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contact;

        public ContactController(IContactService contact)
        {
            _contact = contact;
        }

        [HttpGet("GetContactUs")]
        public async Task<IActionResult> GetAllContacts()
        {
            try
            {
                var contacts = await _contact.GetContactUsAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Has an error : {ex.Message}");
            }
        }

        [HttpPost("SendContactUs")]
        public async Task<IActionResult> CreateContactUs(ContactUsDto dto)
        {
            try
            {
                var contact = new ContactUs
                {
                    Name = dto.Name, 
                    Email = dto.Email, 
                    PhoneNumber = dto.PhoneNumber, 
                    Message = dto.Message
                };
                var createdContact = await _contact.AddContactAsync(contact);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetContactById(int id)
        {
            try
            {
                var contact = _contact.GetContactByIdAsync(id);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Not found article: {ex.Message}");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteContactUs(int id)
        {
            try
            {
                var contact = await _contact.GetContactByIdAsync(id);
                if (contact == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, $"contactUs With id: {id} does not exist");

                }
                await _contact.DeleteContactAsync(contact);
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
