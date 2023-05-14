using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController :BaseApiController
{
    public ActivitiesController()
    {
    }

    [HttpGet] // api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetAllActivities.Query());
    }

    [HttpGet("{id}")] //api/activities/guid
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
      return Ok(await Mediator
          .Send(new Create.Command{Activity = activity}));

      
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Update.Command { Activity = activity }));

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }


}
