# Market and wallet safety

## Before connecting

- Confirm that you are using the intended Bitcoin Universe domain.
- Install a supported wallet only from its trusted release channel.
- Select the correct account and network.
- Treat experimental protocols and assets as high risk.

## Before signing

1. Compare the asset and quantity with the listing or action you selected.
2. Verify every destination and fee shown by the wallet.
3. Reject unexpected inputs, outputs, permissions, or network changes.
4. Refresh market state after an error before trying again.
5. Never approve a request because a support account pressures you to act.

## Reader availability

If a market says its reader is unavailable, do not assume that no tokens,
listings, or activity exist. Retry later or use the protocol’s independent
explorer. Do not create or repeat a transaction from stale market data.

An empty market and an unreadable market are never shown the same way:

- **Nothing listed** reads as no tokens found. The market was read and it is
  genuinely empty.
- **Market unavailable** names the market, says the read failed, and offers a
  retry. Treat it as unknown, not empty.
- **Partial book** means only Universe listings could be loaded. What you see
  is real but incomplete.

A failed read is reported in plain language. You should never see a status
code or a raw response payload on the page; if you do, report it.

## Unmeasured figures

A market figure that Bitcoin Universe cannot currently measure is shown as a
dash, not as a number. Floor, volume, holder counts, listing counts, and any
score derived from them follow this rule, so a dash means the figure was not
read and a number means it was.

The platform never fills a gap with a sample row or a figure written into the
application. If a market cannot be read, its rows are not replaced with stand-in
tokens, and its totals are not estimated. This is why a market can show a name
and a dash in every column: that state is honest about what is known.

Treat a dash as unknown rather than as zero, and do not read a ranking into a
table whose sorted column is entirely dashes.

## Retired markets

Some legacy markets are retired: their listings and history stay viewable,
but buying and listing are closed. A retired market says so in a notice on
the page, and its buy and list controls read as closed instead of
actionable. OP-20 and OP Names are retired today.

A retired market is not an outage. Retrying does not reopen it, and no
transaction is created by anything you press there.

## Pending mint activity

Where a protocol's Universe index also reads the mempool, its index table
shows a Pending column with the number of unconfirmed mints per token
(Alkanes today). A market whose source cannot answer that question shows no
Pending column at all rather than a zero, following the unmeasured-figures
rule above.

## Reading market activity

Activity rows are dated from when the trade happened, not from when the
platform last touched the record. Maintenance passes re-check historical
trades, and those passes never move a row's date forward or resurface an old
trade as current activity.

Read the date before treating a row as a signal. Recent activity is a record of
past trades; it is not a price feed, a measure of current liquidity, or a
prediction. A quiet market shows older dates rather than hiding them.

## TAP-DOGE test environment

The TAP-DOGE view on `test.bitcoinuniverse.io` uses its own staging API. It
does not silently switch to production data when that staging API is
unavailable. An unavailable-reader message therefore means the test data
source could not be verified; wait for it to recover before evaluating market
balances or activity.

The test environment is for validation, not real-fund transactions. Always
return to the production application and verify the active network and reader
status before approving a live wallet request.

## What the platform does not prove

An on-chain transaction does not by itself prove the identity of a counterparty,
the value of an asset, or the accuracy of off-chain descriptions. Verify those
details independently before committing funds.

## Next

- [Protocol coverage](protocol-coverage.md): what this application serves, and what "covered" does not mean.
- [Bitcoin data reliability](bitcoin-data-reliability.md): where network data comes from and what an outage looks like.
- [Manage assets from Portfolio](portfolio-market-actions.md): act on what you own once a wallet is connected.

All guides are indexed in the [documentation home](../README.md#guides).
