# 🎥 Session Video Flow & Behavior

This explains how the Watch Page (`/watch/:sessionId`) and the `SmartVideoPlayer` work together with the backend API to handle workout sessions, video playback, and leaderboard eligibility.

## 🔄 End-to-End Flow

1. User Entry

   - User receives an email link to `/watch/:sessionId`.
   - Navigates to the page.

2. Authentication & Data Fetch
   - `page.tsx` checks if the user is authenticated.
   - If not → redirect to login → then back to `/watch/:sessionId`.
   - If authenticated → fetch session details from
     GET `/api/v1/account/{accountId}/sessions/{sessionId}`.

Data returned (from SessionDto):

```json
{
  "sessionStartTime": "2025-09-22T10:00:00.000+0200",
  "sessionExecutionTime": null,
  "exerciseType": "HIP",
  "sessionStatus": "OVERDUE",
  "sessionVideoUrl": "https://youtu.be/-7mdU1-eEpk"
}
```

3. Rendering

   - Page renders three sections:
     - ⏱ Movement break (from CMS)
     - 🎥 Exercise video (`SmartVideoPlayer`)
     - 💬 Weekly quote (from CMS)

4. Video Playback & Eligibility
   - `SmartVideoPlayer`:
     - Uses `sessionStatus` from the backend (`NEW`, `COMPLETED`, `OVERDUE`) as the single source of truth.
     - If `NEW` → shows a green “active” banner with the deadline (`sessionStartTime + 1h`), enables “Mark as Done” after ≥90% watched.
     - If `COMPLETED` → shows 🏅 success state, “Nice work!” message, leaderboard link.
     - If `OVERDUE` → shows a red expired banner, video still playable, but no leaderboard credit.
     - Handles progress tracking via `ReactPlayer`.
   - Requires ≥ 90% watched before enabling “Mark as Done”.
   - Calls `PUT /sessions/{id}` to update session status when complete.

## 🟩 Session Status & UI States

| **`sessionStatus`** | **Frontend UI**                                                                                              | **Eligibility**              |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `NEW`               | Green ✅ banner, video player, “Mark as Done” button (enabled at ≥90% watched). Shows deadline (`start+1h`). | ✅ Counts toward leaderboard |
| `COMPLETED`         | 🏅 Success badge, “Nice work!” message, leaderboard link                                                     | Already credited             |
| `OVERDUE`           | Red ⏱ banner, video only, leaderboard link                                                                  | ❌ No points                 |

## 📡 Backend Responses & Frontend Behavior

| **Response**                 | **When**                                        | **Frontend Behavior**                   | **Toast Message**                                                                                    |
| ---------------------------- | ----------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **204 No Content**           | Normal success after PUT                        | Marks session as completed, updates UI  | 🟢 _“Nice Work! Video successfully marked as completed.”_                                            |
| **200 OK + JSON** (rare)     | Backend returns extra info                      | Used if present, fallback same as above | 🟢 Success                                                                                           |
| **409 Conflict**             | Session already finished (COMPLETED or OVERDUE) | No points, still watchable              | ℹ️ _“This session is already closed. You can still watch the video, but no points will be awarded.”_ |
| **400/401/403 Unauthorized** | Invalid/expired token                           | Error, nothing marked                   | 🔴 _“Failed to Save Progress. Unauthorized.”_                                                        |
| **404 Not Found**            | Invalid `sessionId` or wrong account            | Error                                   | 🔴 _“Failed to Save Progress. Session not found.”_                                                   |
| **500 Server Error**         | Unexpected backend failure                      | Error                                   | 🔴 _“Something went wrong. Please try again later.”_                                                 |

## ✅ QA Checklist

When testing, confirm these cases:

1. **Active session:** Play ≥90% → button enabled → PUT succeeds → success toast → points awarded.
2. **Completed session:** 🏅 badge + message, no button.
3. **Overdue session (from backend):** Red banner, no button, video watchable.
4. **Conflict (409):** Session already finished → info toast, no points.
5. **Invalid sessionId:** Shows error toast.
6. **Backend 500:** Shows red error toast.

## ⚠️ Notes for Developers

- Backend is the single source of truth for session state (`NEW`, `COMPLETED`, `OVERDUE`). The frontend only reflects this state and does not re-calculate expiry windows.
- `sessionStartTime + 1h` is used purely to display a deadline to the user in the UI, not to decide eligibility.
- Do not assume JSON on all backend responses → handle 204 No Content safely.
- Toast messages are the user-facing feedback mechanism. Always make sure they are clear and non-technical.
- Leaderboards update only when sessions are completed within the 1h window (backend-enforced).
