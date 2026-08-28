# Release validation

Bitcoin Universe changes are validated before publication through automated
checks that build the application and exercise its safety-sensitive paths.
Validation is designed to use the organisation's managed private build fleet
for trusted release work, so an unrelated hosted-build capacity issue does not
turn a product release into a failed result.

Portable Core validation is eligible across eighteen certified Linux services
on four independent hosts. Browser-backed jobs use the shared browser
capability, while source-only quality jobs use the common portable pool. This
lets an idle compatible runner accept work immediately and preserves failover
when one service or host is unavailable.

If that managed fleet has a short infrastructure interruption, an eligible
first attempt may receive one automatic retry. A retry is never used to hide a
reported validation failure.

Production freshness checks use the repository-scoped, pinned GitHub deploy
identity with bounded connection timeouts and retries. Exhausting those retries
fails closed before release links change; it never permits a cached candidate
to bypass exact-`main` verification.

Some platform-specific compatibility probes require a dedicated environment.
Those probes run only when their managed environment is explicitly available;
they do not weaken the safety or availability checks for the supported release
paths. A passing validation result is release evidence, not a claim that a
change has already reached production.

The deployment health check also respects the selected Marketplace profile. A
read-only release requires both healthy database-backed application reads and
a validated private Bitcoin chain-tip read, and keeps transaction traffic
explicitly closed. A mutation-ready release is accepted
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

Screenshot comparison reuses that same validated build instead of compiling a
second one. A candidate is therefore compared pixel for pixel against the exact
artifact that passed the browser and accessibility gates, and a shared build
host is asked to compile the interface once per revision rather than twice.

After a release is activated, a recurring check runs against the live public
surfaces every ten minutes. It confirms the published release marker, the fee
response, anonymous collection activity, and that the live event stream stays
open for a full observation window and keeps sending keepalives that do not
advance a reader's position. Deeper sweeps that place real load on the
Universe-operated services stay available for release rehearsal and are not
part of the recurring check.

Frontend release tests run without a persistent Jest transform cache. This
keeps transient files from accumulating across projects on a shared runner and
prevents runner storage pressure from being confused with a failed product
test.

Each trusted test job also receives an isolated, memory-backed temporary
workspace that is removed when the job finishes. Push and pull-request events
for the same exact revision are coalesced into one validation workload. These
boundaries protect test reliability without weakening any required assertion,
build, or release gate.

Interactive interface tests explicitly wait for a newly selected request and
its rendered result before comparing it with an older response. This preserves
the user-visible guarantee that stale network data cannot replace newer
marketplace data, without treating temporary runner scheduling as a product
failure.

Catalog retry checks also reset their mocked data source before each scenario.
This keeps an intentionally unresolved loading simulation from one interface
test from leaking into the next test's failure-and-recovery validation.
