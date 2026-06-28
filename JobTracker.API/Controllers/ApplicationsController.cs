using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTracker.API.Data;
using JobTracker.API.Entities;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApplicationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ApplicationsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applications = await _context.Applications
            .Include(a => a.Interviews)
            .ToListAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var application = await _context.Applications
            .Include(a => a.Interviews)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (application == null) return NotFound();
        return Ok(application);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Application application)
    {
        _context.Applications.Add(application);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Application updated)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null) return NotFound();

        application.CompanyName = updated.CompanyName;
        application.Position = updated.Position;
        application.Location = updated.Location;
        application.JobUrl = updated.JobUrl;
        application.Notes = updated.Notes;
        application.StatusUpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(application);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null) return NotFound();

        _context.Applications.Remove(application);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}