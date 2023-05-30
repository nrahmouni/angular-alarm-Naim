using DomoHome.Api.Controllers;
using DomoHome.Api.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("[controller]")]
public class AlarmController : ControllerBase
{
    private readonly IHubContext<AlarmHub> hub;
    private readonly IAlarmService alarmService;

    public AlarmController(IHubContext<AlarmHub> hubContext, IAlarmService alarmService)
    {
        this.hub = hubContext;
        this.alarmService = alarmService;
    }

    [HttpGet]
    public IActionResult GetAlarmStatus()
    {
        string status = alarmService.GetAlarmStatus();
        return this.Ok(status);
    }

    [HttpPost]
    public async Task<IActionResult> SetAlarmStatus(string status)
    {
        alarmService.SetAlarmStatus(status);
        await this.hub.Clients.All.SendAsync("alarmStateChanged", status);
        return this.Ok();
    }

    [HttpGet]
    [Route("camera")]
    public IActionResult GetCameraImage()
    {
        Camera camera = new Camera();
        byte[] imageBytes = camera.Capture();
        return this.File(imageBytes, "image/jpeg");
    }
}
