# Private chat verification

Bitcoin Universe private chat uses a wallet signature only to verify that the
connected Bitcoin address controls the chat identity. It never asks a wallet
signature just because you open Chat, search an address, select a contact, or
read public chat content.

To open private messages, press **Verify wallet**. Your wallet will show a
short-lived request for `chat:firebase-token`. Read the request before signing.
It identifies the address, a one-time nonce, an expiry time, and states that it
is for private-chat sign-in only. This signature cannot authorize a payment or
Bitcoin transaction.

If the request appears without you pressing **Verify wallet**, reject it. Do
not sign messages you do not understand. Never share a seed phrase, private
key, wallet backup, or recovery code in Chat.
