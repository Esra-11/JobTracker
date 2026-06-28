namespace JobTracker.API.Entities;
public class Application
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? JobUrl { get; set; }
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    public DateTime? StatusUpdatedAt { get; set; }
    public string? Notes { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public List<Interview> Interviews { get; set; } = new();
}

public enum ApplicationStatus
{
    Applied,
    Interview,
    Offer,
    Rejected
}