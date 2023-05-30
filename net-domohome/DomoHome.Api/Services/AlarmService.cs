using DomoHome.Api.Controllers;
using DomoHome.Api.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;

public class AlarmService : IAlarmService
{
    private const string AlarmStateCacheKey = "AlarmState";
    private readonly IMemoryCache memoryCache;
    private readonly IHubContext<AlarmHub> hub;

    public AlarmService(IHubContext<AlarmHub> hubContext, IMemoryCache memoryCache)
    {
        hub = hubContext;
        this.memoryCache = memoryCache;
    }

    public string GetAlarmStatus()
    {
        return memoryCache.Get<string>(AlarmStateCacheKey) ?? "Unknown";
    }

    public void SetAlarmStatus(string status)
    {
        memoryCache.Set(AlarmStateCacheKey, status);
        hub.Clients.All.SendAsync("alarmStateChanged", status);
    }

    public string GetCameraImage()
    {
        Camera camera = new Camera();
        byte[] imageBytes = camera.Capture();
        string base64Image = Convert.ToBase64String(imageBytes);
        return base64Image;
    }
}
