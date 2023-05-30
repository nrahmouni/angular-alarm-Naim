using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DomoHome.Api.Hubs
{
    public class AlarmHub : Hub
    {
        private readonly IAlarmService alarmService;

        public AlarmHub(IAlarmService alarmService)
        {
            this.alarmService = alarmService;
        }
        public async Task GetAlarmStatus()
        {
            var status = alarmService.GetAlarmStatus();
            await Clients.Caller.SendAsync("alarmStateChanged", status );
        }

        public async Task SetAlarmState(string newState)
        {
            alarmService.SetAlarmStatus(newState);
            await Clients.All.SendAsync("alarmStateChanged", newState);
        }

        public async Task ActivateAlarm()
        {
            alarmService.SetAlarmStatus("Activated");
            await Clients.All.SendAsync("alarmStateChanged", "Activated");
        }

        public async Task GetCameraImage()
        {
            var base64Image = alarmService.GetCameraImage();
            await Clients.Caller.SendAsync("receiveCameraImage", base64Image);
        }

    }
}
