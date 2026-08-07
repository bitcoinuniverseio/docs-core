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
