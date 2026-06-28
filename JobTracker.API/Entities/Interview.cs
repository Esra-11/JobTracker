namespace JobTracker.API.Entities;

public class Interview
{
    public Guid Id { get; set; }
    public Guid ApplicationId { get; set; }
    public Application Application { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty; // Phone, Technical, HR
    public string? Notes { get; set; }
    public string? Questions { get; set; }
}