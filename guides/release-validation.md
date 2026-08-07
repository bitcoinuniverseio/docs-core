# Release validation

Bitcoin Universe changes are validated before publication through automated
checks that build the application and exercise its safety-sensitive paths.
Validation is designed to use the organisation's managed private build fleet
for trusted release work, so an unrelated hosted-build capacity issue does not
turn a product release into a failed result.

If that managed fleet has a short infrastructure interruption, an eligible
first attempt may receive one automatic retry. A retry is never used to hide a
reported validation failure.

Some platform-specific compatibility probes require a dedicated environment.
Those probes run only when their managed environment is explicitly available;
they do not weaken the safety or availability checks for the supported release
paths. A passing validation result is release evidence, not a claim that a
change has already reached production.
