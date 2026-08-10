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

The deployment health check also respects the selected Marketplace profile. A
read-only release requires healthy database-backed application reads and keeps
transaction traffic explicitly closed. A mutation-ready release is accepted
only after three complete healthy refresh cycles across all 26 protocol
authorities. This prevents a generic healthy response from being mistaken for
permission to list, buy, sell, or make offers.

Marketplace database releases are rehearsed on both MySQL 8 and MariaDB 10.11.
The validation compares semantic column types, constraints, checks, triggers,
idempotent reruns, and guarded rollback behavior, so harmless database display
differences cannot weaken or incorrectly block the same safety contract.

The production frontend build also runs with a bounded JavaScript heap on the
managed fleet. This keeps one compilation from exhausting a shared build host
while still producing and validating the same release artifact.

Frontend release tests run without a persistent Jest transform cache. This
keeps transient files from accumulating across projects on a shared runner and
prevents runner storage pressure from being confused with a failed product
test.

Each trusted test job also receives an isolated, memory-backed temporary
workspace that is removed when the job finishes. Push and pull-request events
for the same exact revision are coalesced into one validation workload. These
boundaries protect test reliability without weakening any required assertion,
build, or release gate.
