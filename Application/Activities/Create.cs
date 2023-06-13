using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class Create
{

    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            
            _context = context;

        }
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.Activities.AddAsync(request.Activity);

            // save changes return int with number of changes
            var numberOfChanges = await _context.SaveChangesAsync();

            return numberOfChanges > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to create Activity");

        }
    }
}