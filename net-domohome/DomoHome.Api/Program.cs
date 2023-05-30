using DomoHome.Api.Hubs;
using Microsoft.Extensions.Caching.Memory;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddScoped<IAlarmService, AlarmService>();
builder.Services.AddCors(options => options.AddDefaultPolicy(corsBuilder => corsBuilder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials()));
builder.Services.AddMemoryCache(); 

WebApplication app = builder.Build();

app.UseCors();

app.UseRouting();
app.UseEndpoints(
    endpoints =>
    {
        endpoints.MapHub<AlarmHub>("/alarm-hub");
        endpoints.MapControllers();
    });

app.Run();
