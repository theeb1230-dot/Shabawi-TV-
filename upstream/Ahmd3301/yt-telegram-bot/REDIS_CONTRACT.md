# Redis contract
Source: Ahmd3301/yt-telegram-bot @ b0d976afd447dbfdc85f29afb933864954df9d50

The worker uses Upstash Redis with these logical key families:
- asset:youtube:<videoId>:<quality>
- lock:youtube:<videoId>:<quality>
- waiting:youtube:<videoId>:<quality>
- user:<chatId>

Asset hashes carry status, telegram_file_id, worker_id, timestamps, size and error.
Waiting queues are Redis lists. User locks expire after 20 minutes; language preference after 30 days.
No Redis URL/token/value is stored here. Runtime credentials belong in the destination secret store.
